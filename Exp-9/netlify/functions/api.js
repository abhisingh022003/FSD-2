/**
 * Netlify Function: api
 * Exp-9 — Token-based Authentication
 *
 * Three auth strategies implemented with Node.js built-ins only (no npm deps):
 *   1. Basic Auth  (Authorization: Basic <base64>)
 *   2. Custom Header Auth  (X-Username / X-Password)
 *   3. JWT HS256  (login + protected resource)
 */
"use strict";

const crypto = require("crypto");

const SECRET_KEY = process.env.JWT_SECRET || "exp9-secret-key";
const USERS = { admin: "password123", user: "userpass" };

// ── Minimal JWT HS256 (Node.js crypto only) ──────────────────────────────────

function b64url(buf) {
  return buf.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function b64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = str.length % 4;
  if (pad) str += "=".repeat(4 - pad);
  return Buffer.from(str, "base64");
}

function jwtEncode(payload) {
  const header = b64url(Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })));
  const body   = b64url(Buffer.from(JSON.stringify(payload)));
  const sigInput = `${header}.${body}`;
  const sig = b64url(crypto.createHmac("sha256", SECRET_KEY).update(sigInput).digest());
  return `${sigInput}.${sig}`;
}

function jwtDecode(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid token structure");
  const [headerEnc, payloadEnc, sigEnc] = parts;
  const sigInput = `${headerEnc}.${payloadEnc}`;
  const expected = b64url(crypto.createHmac("sha256", SECRET_KEY).update(sigInput).digest());
  if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sigEnc)))
    throw new Error("Signature mismatch");
  const payload = JSON.parse(b64urlDecode(payloadEnc).toString());
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp)
    throw new Error("Token expired");
  return payload;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function verify(username, password) {
  return USERS[username] === password;
}

function respond(body, status = 200) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Username, X-Password",
    },
    body: JSON.stringify(body),
  };
}

// ── Handler ───────────────────────────────────────────────────────────────────

exports.handler = async function (event) {
  const method = (event.httpMethod || "GET").toUpperCase();

  // CORS preflight
  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Username, X-Password",
      },
      body: "",
    };
  }

  // Normalise path — strip function prefix when invoked directly
  let path = event.path || "/";
  for (const prefix of ["/.netlify/functions/api", "/api"]) {
    if (path.startsWith(prefix)) {
      path = path.slice(prefix.length) || "/";
      break;
    }
  }
  if (!path) path = "/";

  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([k, v]) => [k.toLowerCase(), v])
  );

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch { /* ignore */ }

  // ── Root ──────────────────────────────────────────────────────────────────
  if (path === "/" || path === "") {
    return respond({
      experiment: "Exp-9: Token-based Authentication",
      endpoints: {
        "GET /auth/basic":         "Basic Auth via Authorization header",
        "GET /auth/custom-header": "Auth via X-Username / X-Password headers",
        "POST /auth/jwt/login":    "Get JWT token",
        "GET /auth/jwt/protected": "JWT-protected resource",
      },
    });
  }

  // ── 1. Basic Auth ─────────────────────────────────────────────────────────
  if (path === "/auth/basic" && method === "GET") {
    const auth = headers.authorization || "";
    if (!auth.toLowerCase().startsWith("basic "))
      return respond({ error: "Missing or invalid Authorization header" }, 401);
    let username, password;
    try {
      const decoded = Buffer.from(auth.slice(6), "base64").toString();
      const colon = decoded.indexOf(":");
      username = decoded.slice(0, colon);
      password = decoded.slice(colon + 1);
    } catch {
      return respond({ error: "Malformed credentials" }, 400);
    }
    if (!verify(username, password))
      return respond({ error: "Invalid username or password" }, 401);
    const token = Buffer.from(`token:${username}`).toString("base64");
    return respond({ message: "Basic Auth successful", username, token });
  }

  // ── 2. Custom Header Auth ─────────────────────────────────────────────────
  if (path === "/auth/custom-header" && method === "GET") {
    const username = headers["x-username"] || "";
    const password = headers["x-password"] || "";
    if (!username || !password)
      return respond({ error: "X-Username and X-Password headers are required" }, 401);
    if (!verify(username, password))
      return respond({ error: "Invalid username or password" }, 401);
    const token = Buffer.from(`custom:${username}`).toString("base64");
    return respond({ message: "Custom Header Auth successful", username, token });
  }

  // ── 3a. JWT Login ─────────────────────────────────────────────────────────
  if (path === "/auth/jwt/login" && method === "POST") {
    const { username = "", password = "" } = body;
    if (!username || !password)
      return respond({ error: "username and password are required" }, 400);
    if (!verify(username, password))
      return respond({ error: "Invalid username or password" }, 401);
    const now = Math.floor(Date.now() / 1000);
    const token = jwtEncode({ sub: username, iat: now, exp: now + 3600 });
    return respond({ message: "JWT login successful", token, token_type: "Bearer", expires_in: 3600 });
  }

  // ── 3b. JWT Protected ─────────────────────────────────────────────────────
  if (path === "/auth/jwt/protected" && method === "GET") {
    const auth = headers.authorization || "";
    if (!auth.toLowerCase().startsWith("bearer "))
      return respond({ error: "Missing or invalid Bearer token" }, 401);
    const token = auth.slice(7);
    try {
      const payload = jwtDecode(token);
      return respond({ message: "JWT Auth successful \u2014 protected resource accessed", username: payload.sub });
    } catch (e) {
      if (e.message.toLowerCase().includes("expired"))
        return respond({ error: "Token has expired" }, 401);
      return respond({ error: "Invalid token" }, 401);
    }
  }

  return respond({ error: `Route not found: ${method} ${path}` }, 404);
};
