import base64
import datetime
import os

import jwt
from flask import Flask, jsonify, request

app = Flask(__name__)

SECRET_KEY = os.environ.get("JWT_SECRET", "exp9-secret-key")

# Mock user store
USERS = {
    "admin": "password123",
    "user": "userpass",
}


def verify_credentials(username, password):
    return USERS.get(username) == password


# ─── 1. Authorization Header (Basic Auth) ───────────────────────────────────

@app.route("/auth/basic", methods=["GET"])
def basic_auth():
    """
    Authenticate via Authorization: Basic <base64(username:password)>
    Returns a simple access token on success.
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Basic "):
        return jsonify({"error": "Missing or invalid Authorization header"}), 401

    try:
        decoded = base64.b64decode(auth_header[6:]).decode("utf-8")
        username, password = decoded.split(":", 1)
    except Exception:
        return jsonify({"error": "Malformed credentials"}), 400

    if not verify_credentials(username, password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = base64.b64encode(f"token:{username}".encode()).decode()
    return jsonify({
        "message": "Basic Auth successful",
        "username": username,
        "token": token,
    }), 200


# ─── 2. Custom Header Auth ──────────────────────────────────────────────────

@app.route("/auth/custom-header", methods=["GET"])
def custom_header_auth():
    """
    Authenticate via custom headers:
      X-Username: <username>
      X-Password: <password>
    Returns a simple access token on success.
    """
    username = request.headers.get("X-Username", "")
    password = request.headers.get("X-Password", "")

    if not username or not password:
        return jsonify({"error": "X-Username and X-Password headers are required"}), 401

    if not verify_credentials(username, password):
        return jsonify({"error": "Invalid username or password"}), 401

    token = base64.b64encode(f"custom:{username}".encode()).decode()
    return jsonify({
        "message": "Custom Header Auth successful",
        "username": username,
        "token": token,
    }), 200


# ─── 3. JWT Auth ─────────────────────────────────────────────────────────────

@app.route("/auth/jwt/login", methods=["POST"])
def jwt_login():
    """
    POST { "username": "...", "password": "..." }
    Returns a JWT Bearer token valid for 1 hour.
    """
    data = request.get_json(silent=True) or {}
    username = data.get("username", "")
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"error": "username and password are required"}), 400

    if not verify_credentials(username, password):
        return jsonify({"error": "Invalid username or password"}), 401

    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
        "sub": username,
        "iat": now,
        "exp": now + datetime.timedelta(hours=1),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return jsonify({
        "message": "JWT login successful",
        "token": token,
        "token_type": "Bearer",
        "expires_in": 3600,
    }), 200


@app.route("/auth/jwt/protected", methods=["GET"])
def jwt_protected():
    """
    Access a protected resource.
    Requires Authorization: Bearer <jwt_token>
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing or invalid Bearer token"}), 401

    token = auth_header[7:]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"error": "Invalid token"}), 401

    return jsonify({
        "message": "JWT Auth successful — protected resource accessed",
        "username": payload["sub"],
    }), 200


# ─── Health check ────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "experiment": "Exp-9: Token-based Authentication",
        "endpoints": {
            "GET /auth/basic": "Basic Auth via Authorization header",
            "GET /auth/custom-header": "Auth via X-Username / X-Password headers",
            "POST /auth/jwt/login": "Get JWT token",
            "GET /auth/jwt/protected": "JWT-protected resource",
        },
    }), 200


if __name__ == "__main__":
    app.run(debug=True)
