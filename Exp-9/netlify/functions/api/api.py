import json
import base64
import datetime
import os
import sys

# Make PyJWT installed into this directory importable
sys.path.insert(0, os.path.dirname(__file__))
import jwt  # PyJWT

SECRET_KEY = os.environ.get("JWT_SECRET", "exp9-secret-key")
USERS = {"admin": "password123", "user": "userpass"}


def _resp(body, status=200):
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(body),
    }


def verify(username, password):
    return USERS.get(username) == password


def handler(event, context):
    method = event.get("httpMethod", "GET").upper()

    # Handle CORS preflight
    if method == "OPTIONS":
        return {
            "statusCode": 204,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Username, X-Password",
            },
            "body": "",
        }

    # Determine original path (strip Netlify function prefix)
    path = event.get("path", "/")
    for prefix in ("/.netlify/functions/api", "/api"):
        if path.startswith(prefix):
            path = path[len(prefix):] or "/"
    if not path:
        path = "/"

    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    body_raw = event.get("body") or "{}"
    try:
        body = json.loads(body_raw)
    except Exception:
        body = {}

    # ── Root ──────────────────────────────────────────────────────────────────
    if path in ("/", ""):
        return _resp({
            "experiment": "Exp-9: Token-based Authentication",
            "endpoints": {
                "GET /auth/basic":          "Basic Auth via Authorization header",
                "GET /auth/custom-header":  "Auth via X-Username / X-Password headers",
                "POST /auth/jwt/login":     "Get JWT token",
                "GET /auth/jwt/protected":  "JWT-protected resource",
            },
        })

    # ── 1. Basic Auth ─────────────────────────────────────────────────────────
    if path == "/auth/basic" and method == "GET":
        auth = headers.get("authorization", "")
        if not auth.lower().startswith("basic "):
            return _resp({"error": "Missing or invalid Authorization header"}, 401)
        try:
            decoded = base64.b64decode(auth[6:]).decode()
            username, password = decoded.split(":", 1)
        except Exception:
            return _resp({"error": "Malformed credentials"}, 400)
        if not verify(username, password):
            return _resp({"error": "Invalid username or password"}, 401)
        token = base64.b64encode(f"token:{username}".encode()).decode()
        return _resp({"message": "Basic Auth successful", "username": username, "token": token})

    # ── 2. Custom Header Auth ─────────────────────────────────────────────────
    if path == "/auth/custom-header" and method == "GET":
        username = headers.get("x-username", "")
        password = headers.get("x-password", "")
        if not username or not password:
            return _resp({"error": "X-Username and X-Password headers are required"}, 401)
        if not verify(username, password):
            return _resp({"error": "Invalid username or password"}, 401)
        token = base64.b64encode(f"custom:{username}".encode()).decode()
        return _resp({"message": "Custom Header Auth successful", "username": username, "token": token})

    # ── 3a. JWT Login ─────────────────────────────────────────────────────────
    if path == "/auth/jwt/login" and method == "POST":
        username = body.get("username", "")
        password = body.get("password", "")
        if not username or not password:
            return _resp({"error": "username and password are required"}, 400)
        if not verify(username, password):
            return _resp({"error": "Invalid username or password"}, 401)
        now = datetime.datetime.now(datetime.timezone.utc)
        payload = {"sub": username, "iat": now, "exp": now + datetime.timedelta(hours=1)}
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        return _resp({"message": "JWT login successful", "token": token,
                      "token_type": "Bearer", "expires_in": 3600})

    # ── 3b. JWT Protected ─────────────────────────────────────────────────────
    if path == "/auth/jwt/protected" and method == "GET":
        auth = headers.get("authorization", "")
        if not auth.lower().startswith("bearer "):
            return _resp({"error": "Missing or invalid Bearer token"}, 401)
        token = auth[7:]
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return _resp({"error": "Token has expired"}, 401)
        except jwt.InvalidTokenError:
            return _resp({"error": "Invalid token"}, 401)
        return _resp({"message": "JWT Auth successful — protected resource accessed",
                      "username": payload["sub"]})

    return _resp({"error": f"Route not found: {method} {path}"}, 404)
