import os
import re
import traceback
from datetime import datetime, timedelta, timezone
from functools import wraps

import bcrypt
import jwt
import requests
from bson import ObjectId
from dotenv import load_dotenv
from flask import Flask, g, jsonify, request
from flask_cors import CORS
from pymongo import DESCENDING, MongoClient, ReturnDocument
from pymongo.errors import DuplicateKeyError

TASK_STATUSES = ("pending", "in_progress", "done")
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
DURATION_UNITS = {"s": 1, "m": 60, "h": 3600, "d": 86400}


class ApiError(Exception):
    def __init__(self, status_code, message, details=None):
        super().__init__(message)
        self.status_code = status_code
        self.message = message
        self.details = details


def utc_now():
    return datetime.now(timezone.utc)


def to_iso8601(timestamp):
    if timestamp is None:
        return None

    if timestamp.tzinfo is None:
        timestamp = timestamp.replace(tzinfo=timezone.utc)

    return timestamp.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def normalize_email(value):
    return value.strip().lower()


def get_json_payload():
    payload = request.get_json(silent=True)
    if payload is None:
        return {}

    if not isinstance(payload, dict):
        raise ApiError(
            400,
            "Validation failed",
            [{"field": "body", "message": "Request body must be a JSON object"}],
        )

    return payload


def validation_error(details):
    raise ApiError(400, "Validation failed", details)


def parse_token_expiry(raw_value):
    value = (raw_value or "1d").strip()

    if value.isdigit():
        return timedelta(seconds=int(value))

    match = re.fullmatch(r"(\d+)([smhd])", value)
    if not match:
        raise RuntimeError("JWT_EXPIRES_IN must be integer seconds or <number><s|m|h|d>")

    amount = int(match.group(1))
    unit = match.group(2)
    return timedelta(seconds=amount * DURATION_UNITS[unit])


def create_app():
    load_dotenv()

    required_env = ("MONGODB_URI", "JWT_SECRET")
    for key in required_env:
        if not os.getenv(key):
            raise RuntimeError(f"Missing required environment variable: {key}")

    app = Flask(__name__)
    port = int(os.getenv("PORT", "5000"))
    app.config["PORT"] = port
    app.config["NODE_ENV"] = os.getenv("NODE_ENV", "")

    client_origin = os.getenv("CLIENT_ORIGIN", "http://localhost:5173")
    CORS(app, origins=[client_origin])

    mongo_client = MongoClient(os.environ["MONGODB_URI"], tz_aware=True)
    mongo_client.admin.command("ping")
    database = mongo_client.get_default_database()

    if database is None:
        raise RuntimeError("MONGODB_URI must include a database name")

    users_collection = database["users"]
    tasks_collection = database["tasks"]
    users_collection.create_index("email", unique=True)
    tasks_collection.create_index([("owner", 1), ("createdAt", -1)])

    def serialize_user(user_doc):
        return {
            "_id": str(user_doc["_id"]),
            "name": user_doc["name"],
            "email": user_doc["email"],
            "createdAt": to_iso8601(user_doc.get("createdAt")),
            "updatedAt": to_iso8601(user_doc.get("updatedAt")),
        }

    def serialize_task(task_doc):
        return {
            "_id": str(task_doc["_id"]),
            "title": task_doc["title"],
            "description": task_doc.get("description", ""),
            "status": task_doc["status"],
            "owner": str(task_doc["owner"]),
            "createdAt": to_iso8601(task_doc.get("createdAt")),
            "updatedAt": to_iso8601(task_doc.get("updatedAt")),
        }

    def current_user_object_id():
        user_id = getattr(g, "user_id", None)
        if not user_id or not ObjectId.is_valid(user_id):
            raise ApiError(401, "Invalid or expired token")
        return ObjectId(user_id)

    def parse_task_id(task_id):
        if not ObjectId.is_valid(task_id):
            validation_error([{"field": "id", "message": "Task id must be valid"}])

        return ObjectId(task_id)

    def authenticate(handler):
        @wraps(handler)
        def wrapped(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")

            if not auth_header.startswith("Bearer "):
                raise ApiError(401, "Authorization token is required")

            token = auth_header.split(" ", 1)[1].strip()
            if not token:
                raise ApiError(401, "Authorization token is required")

            try:
                payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=["HS256"])
            except jwt.InvalidTokenError as error:
                raise ApiError(401, "Invalid or expired token") from error

            user_id = payload.get("sub")
            if not user_id:
                raise ApiError(401, "Invalid or expired token")

            g.user_id = str(user_id)
            return handler(*args, **kwargs)

        return wrapped

    def sign_auth_token(user_id):
        now = utc_now()
        expires_in = parse_token_expiry(os.getenv("JWT_EXPIRES_IN", "1d"))
        payload = {
            "sub": str(user_id),
            "iat": now,
            "exp": now + expires_in,
        }
        return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm="HS256")

    @app.get("/api/health")
    def health_check():
        return jsonify({"status": "ok"})

    @app.post("/api/auth/register")
    def register():
        payload = get_json_payload()
        details = []

        name_raw = payload.get("name")
        name = ""
        if not isinstance(name_raw, str) or not name_raw.strip():
            details.append({"field": "name", "message": "Name is required"})
        else:
            name = name_raw.strip()
            if len(name) < 2 or len(name) > 60:
                details.append(
                    {"field": "name", "message": "Name must be between 2 and 60 characters"}
                )

        email_raw = payload.get("email")
        email = ""
        if not isinstance(email_raw, str) or not EMAIL_PATTERN.fullmatch(email_raw.strip()):
            details.append({"field": "email", "message": "Valid email is required"})
        else:
            email = normalize_email(email_raw)

        password = payload.get("password")
        if not isinstance(password, str) or len(password) < 6:
            details.append(
                {"field": "password", "message": "Password must be at least 6 characters"}
            )

        if details:
            validation_error(details)

        existing_user = users_collection.find_one({"email": email}, {"_id": 1})
        if existing_user:
            raise ApiError(409, "Email already registered")

        now = utc_now()
        hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt(rounds=10))
        user_doc = {
            "name": name,
            "email": email,
            "password": hashed_password.decode("utf-8"),
            "createdAt": now,
            "updatedAt": now,
        }

        try:
            result = users_collection.insert_one(user_doc)
        except DuplicateKeyError as error:
            raise ApiError(409, "Email already registered") from error

        user_doc["_id"] = result.inserted_id
        token = sign_auth_token(result.inserted_id)
        return jsonify({"token": token, "user": serialize_user(user_doc)}), 201

    @app.post("/api/auth/login")
    def login():
        payload = get_json_payload()
        details = []

        email_raw = payload.get("email")
        email = ""
        if not isinstance(email_raw, str) or not EMAIL_PATTERN.fullmatch(email_raw.strip()):
            details.append({"field": "email", "message": "Valid email is required"})
        else:
            email = normalize_email(email_raw)

        password = payload.get("password")
        if not isinstance(password, str) or not password:
            details.append({"field": "password", "message": "Password is required"})

        if details:
            validation_error(details)

        user_doc = users_collection.find_one({"email": email})
        if not user_doc:
            raise ApiError(401, "Invalid email or password")

        stored_password = user_doc.get("password", "")
        if not bcrypt.checkpw(password.encode("utf-8"), stored_password.encode("utf-8")):
            raise ApiError(401, "Invalid email or password")

        token = sign_auth_token(user_doc["_id"])
        return jsonify({"token": token, "user": serialize_user(user_doc)})

    @app.get("/api/auth/me")
    @authenticate
    def get_profile():
        user_doc = users_collection.find_one({"_id": current_user_object_id()})
        if not user_doc:
            raise ApiError(404, "User not found")

        return jsonify({"user": serialize_user(user_doc)})

    @app.get("/api/tasks")
    @authenticate
    def list_tasks():
        details = []
        status = request.args.get("status")
        query_text = request.args.get("q")

        if status is not None and status not in TASK_STATUSES:
            details.append(
                {
                    "field": "status",
                    "message": f"Status must be one of: {', '.join(TASK_STATUSES)}",
                }
            )

        if query_text is not None and len(query_text) > 120:
            details.append(
                {"field": "q", "message": "Search query must be 120 characters or less"}
            )

        if details:
            validation_error(details)

        filters = {"owner": current_user_object_id()}
        if status:
            filters["status"] = status

        if query_text:
            filters["$or"] = [
                {"title": {"$regex": query_text, "$options": "i"}},
                {"description": {"$regex": query_text, "$options": "i"}},
            ]

        tasks = [
            serialize_task(task_doc)
            for task_doc in tasks_collection.find(filters).sort("createdAt", DESCENDING)
        ]
        return jsonify({"tasks": tasks})

    @app.get("/api/tasks/<task_id>")
    @authenticate
    def get_task(task_id):
        parsed_task_id = parse_task_id(task_id)
        task_doc = tasks_collection.find_one(
            {"_id": parsed_task_id, "owner": current_user_object_id()}
        )

        if not task_doc:
            raise ApiError(404, "Task not found")

        return jsonify({"task": serialize_task(task_doc)})

    @app.post("/api/tasks")
    @authenticate
    def create_task():
        payload = get_json_payload()
        details = []

        title_raw = payload.get("title")
        title = ""
        if not isinstance(title_raw, str) or not title_raw.strip():
            details.append({"field": "title", "message": "Title is required"})
        else:
            title = title_raw.strip()
            if len(title) > 120:
                details.append({"field": "title", "message": "Title must be 120 characters or less"})

        description_raw = payload.get("description")
        if description_raw is None:
            description = ""
        elif isinstance(description_raw, str):
            description = description_raw
            if len(description) > 500:
                details.append(
                    {"field": "description", "message": "Description must be 500 characters or less"}
                )
        else:
            description = ""
            details.append(
                {"field": "description", "message": "Description must be 500 characters or less"}
            )

        status_raw = payload.get("status")
        if status_raw is None:
            status = "pending"
        elif status_raw in TASK_STATUSES:
            status = status_raw
        else:
            status = "pending"
            details.append(
                {
                    "field": "status",
                    "message": f"Status must be one of: {', '.join(TASK_STATUSES)}",
                }
            )

        if details:
            validation_error(details)

        now = utc_now()
        task_doc = {
            "title": title,
            "description": description,
            "status": status,
            "owner": current_user_object_id(),
            "createdAt": now,
            "updatedAt": now,
        }
        result = tasks_collection.insert_one(task_doc)
        task_doc["_id"] = result.inserted_id
        return jsonify({"task": serialize_task(task_doc)}), 201

    @app.put("/api/tasks/<task_id>")
    @authenticate
    def update_task(task_id):
        parsed_task_id = parse_task_id(task_id)
        payload = get_json_payload()
        details = []

        title_raw = payload.get("title")
        title = ""
        if not isinstance(title_raw, str) or not title_raw.strip():
            details.append({"field": "title", "message": "Title is required"})
        else:
            title = title_raw.strip()
            if len(title) > 120:
                details.append({"field": "title", "message": "Title must be 120 characters or less"})

        description_raw = payload.get("description")
        if description_raw is None:
            description = ""
        elif isinstance(description_raw, str):
            description = description_raw
            if len(description) > 500:
                details.append(
                    {"field": "description", "message": "Description must be 500 characters or less"}
                )
        else:
            description = ""
            details.append(
                {"field": "description", "message": "Description must be 500 characters or less"}
            )

        status_raw = payload.get("status")
        if status_raw not in TASK_STATUSES:
            details.append(
                {
                    "field": "status",
                    "message": f"Status must be one of: {', '.join(TASK_STATUSES)}",
                }
            )
            status = "pending"
        else:
            status = status_raw

        if details:
            validation_error(details)

        updated_task = tasks_collection.find_one_and_update(
            {"_id": parsed_task_id, "owner": current_user_object_id()},
            {
                "$set": {
                    "title": title,
                    "description": description,
                    "status": status,
                    "updatedAt": utc_now(),
                }
            },
            return_document=ReturnDocument.AFTER,
        )

        if not updated_task:
            raise ApiError(404, "Task not found")

        return jsonify({"task": serialize_task(updated_task)})

    @app.patch("/api/tasks/<task_id>")
    @authenticate
    def patch_task(task_id):
        parsed_task_id = parse_task_id(task_id)
        payload = get_json_payload()
        details = []
        updates = {}

        if "title" in payload:
            title_raw = payload.get("title")
            if not isinstance(title_raw, str) or not title_raw.strip():
                details.append({"field": "title", "message": "Title cannot be empty"})
            else:
                title = title_raw.strip()
                if len(title) > 120:
                    details.append(
                        {"field": "title", "message": "Title must be 120 characters or less"}
                    )
                else:
                    updates["title"] = title

        if "description" in payload:
            description_raw = payload.get("description")
            if not isinstance(description_raw, str) or len(description_raw) > 500:
                details.append(
                    {"field": "description", "message": "Description must be 500 characters or less"}
                )
            else:
                updates["description"] = description_raw

        if "status" in payload:
            status_raw = payload.get("status")
            if status_raw not in TASK_STATUSES:
                details.append(
                    {
                        "field": "status",
                        "message": f"Status must be one of: {', '.join(TASK_STATUSES)}",
                    }
                )
            else:
                updates["status"] = status_raw

        if details:
            validation_error(details)

        updates["updatedAt"] = utc_now()

        updated_task = tasks_collection.find_one_and_update(
            {"_id": parsed_task_id, "owner": current_user_object_id()},
            {"$set": updates},
            return_document=ReturnDocument.AFTER,
        )

        if not updated_task:
            raise ApiError(404, "Task not found")

        return jsonify({"task": serialize_task(updated_task)})

    @app.delete("/api/tasks/<task_id>")
    @authenticate
    def delete_task(task_id):
        parsed_task_id = parse_task_id(task_id)
        delete_result = tasks_collection.delete_one(
            {"_id": parsed_task_id, "owner": current_user_object_id()}
        )

        if delete_result.deleted_count == 0:
            raise ApiError(404, "Task not found")

        return "", 204

    @app.get("/api/external/posts")
    def list_external_posts():
        limit_raw = request.args.get("limit")
        details = []

        if limit_raw is None:
            limit = 5
        else:
            try:
                limit = int(limit_raw)
            except ValueError:
                limit = 0

            if limit < 1 or limit > 20:
                details.append({"field": "limit", "message": "Limit must be between 1 and 20"})

        if details:
            validation_error(details)

        try:
            response = requests.get(
                "https://jsonplaceholder.typicode.com/posts",
                timeout=8,
            )
            response.raise_for_status()
            response_data = response.json()
        except requests.RequestException as error:
            raise ApiError(502, "Unable to fetch data from external API") from error

        posts = [
            {
                "id": post.get("id"),
                "userId": post.get("userId"),
                "title": post.get("title"),
                "body": post.get("body"),
            }
            for post in response_data[:limit]
        ]

        return jsonify({"count": len(posts), "posts": posts})

    @app.errorhandler(ApiError)
    def handle_api_error(error):
        payload = {"message": error.message}
        if error.details:
            payload["details"] = error.details
        return jsonify(payload), error.status_code

    @app.errorhandler(404)
    def not_found_handler(_error):
        return jsonify({"message": f"Route not found: {request.method} {request.path}"}), 404

    @app.errorhandler(DuplicateKeyError)
    def duplicate_key_handler(_error):
        return jsonify({"message": "Resource already exists"}), 409

    @app.errorhandler(Exception)
    def error_handler(error):
        status_code = 500
        message = str(error) or "Internal server error"
        payload = {"message": message}

        if app.config["NODE_ENV"] != "production":
            payload["stack"] = traceback.format_exc()

        return jsonify(payload), status_code

    return app


def main():
    try:
        app = create_app()
    except Exception as error:
        print(f"Failed to start backend server: {error}")
        raise SystemExit(1) from error

    port = app.config["PORT"]
    print(f"API server running on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)


if __name__ == "__main__":
    main()
