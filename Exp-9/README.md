# Experiment 9 — Token-based Authentication (Flask)

A Flask backend implementing three token-based authentication strategies.

## Tech Stack
- Python 3 · Flask · PyJWT · Gunicorn

## Demo
> **Deployed on Render:** _(add your Render URL here after deployment)_

---

## Setup & Run Locally

```bash
cd Exp-9
pip install -r requirements.txt
python app.py
# Server runs at http://127.0.0.1:5000
```

---

## Credentials (for testing)

| Username | Password    |
|----------|-------------|
| admin    | password123 |
| user     | userpass    |

---

## Endpoints

### 1. Basic Auth — Authorization Header
**`GET /auth/basic`**

Credentials are sent as a Base64-encoded `Authorization: Basic` header.

**Postman setup:**
- Tab **Authorization** → Type: **Basic Auth**
- Enter Username & Password → Postman auto-sets the header.

**Manual header:**
```
Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
```
_(base64 of `admin:password123`)_

**Success response (200):**
```json
{
  "message": "Basic Auth successful",
  "username": "admin",
  "token": "dG9rZW46YWRtaW4="
}
```

---

### 2. Custom Header Auth
**`GET /auth/custom-header`**

Credentials are sent in custom request headers.

**Postman setup:**
- Tab **Headers**, add:
  - `X-Username` : `admin`
  - `X-Password` : `password123`

**Success response (200):**
```json
{
  "message": "Custom Header Auth successful",
  "username": "admin",
  "token": "Y3VzdG9tOmFkbWlu"
}
```

---

### 3. JWT — Bearer Header

#### 3a. Login to get a token
**`POST /auth/jwt/login`**

**Postman setup:**
- Body → **raw** → JSON:
```json
{ "username": "admin", "password": "password123" }
```

**Success response (200):**
```json
{
  "message": "JWT login successful",
  "token": "<jwt_token>",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### 3b. Access a protected resource
**`GET /auth/jwt/protected`**

**Postman setup:**
- Tab **Authorization** → Type: **Bearer Token** → paste the token from the login step.

**Success response (200):**
```json
{
  "message": "JWT Auth successful — protected resource accessed",
  "username": "admin"
}
```

---

## Error Responses

| Status | Reason                                      |
|--------|---------------------------------------------|
| 400    | Missing / malformed request body or headers |
| 401    | Invalid credentials / expired / bad token   |

---

## Deploying on Render

1. Push this folder to a GitHub repository.
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your repo, set **Root Directory** to `Exp-9`.
4. Build command: `pip install -r requirements.txt`
5. Start command: `gunicorn app:app`
6. Add env var `JWT_SECRET` with a strong random string.
7. Click **Deploy** and copy the live URL.
