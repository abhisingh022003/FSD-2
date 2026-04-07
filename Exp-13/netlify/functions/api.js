const fs = require("fs/promises");

const DB_FILE = "/tmp/exp13-students.json";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const JSON_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  };
}

function noContentResponse() {
  return {
    statusCode: 204,
    headers: JSON_HEADERS,
    body: "",
  };
}

function validationError(details) {
  return jsonResponse(400, { error: "Validation failed", details });
}

function normalizePath(rawPath = "/") {
  let path = rawPath.split("?")[0];
  path = path.replace(/^\/\.netlify\/functions\/api/, "");
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}

async function loadDb() {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (
      !parsed
      || typeof parsed !== "object"
      || !Array.isArray(parsed.students)
      || typeof parsed.nextId !== "number"
    ) {
      return { nextId: 1, students: [] };
    }
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") {
      return { nextId: 1, students: [] };
    }
    throw error;
  }
}

async function saveDb(db) {
  await fs.writeFile(DB_FILE, JSON.stringify(db), "utf8");
}

function parseJsonBody(event) {
  if (!event.body) {
    return { ok: false, response: validationError({ body: ["Request must contain valid JSON body."] }) };
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;

  try {
    const payload = JSON.parse(rawBody);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return { ok: false, response: validationError({ body: ["Request must contain valid JSON body."] }) };
    }
    return { ok: true, payload };
  } catch {
    return { ok: false, response: validationError({ body: ["Request must contain valid JSON body."] }) };
  }
}

function validateStringField(value, label, min, max) {
  if (typeof value !== "string") {
    return `${label} must be a string.`;
  }
  const trimmed = value.trim();
  if (trimmed.length < min || trimmed.length > max) {
    return `${label} must be between ${min} and ${max} characters.`;
  }
  return null;
}

function validateAge(value) {
  if (!Number.isInteger(value)) {
    return "Age must be an integer.";
  }
  if (value < 1 || value > 120) {
    return "Age must be between 1 and 120.";
  }
  return null;
}

function validateCreatePayload(payload) {
  const details = {};
  const required = ["name", "email", "age", "course"];
  const unknownFields = Object.keys(payload).filter((key) => !required.includes(key));

  for (const field of unknownFields) {
    details[field] = ["Unknown field."];
  }

  for (const field of required) {
    if (!(field in payload)) {
      details[field] = ["Missing required field."];
    }
  }

  if ("name" in payload) {
    const error = validateStringField(payload.name, "Name", 2, 100);
    if (error) details.name = [error];
  }

  if ("email" in payload) {
    if (typeof payload.email !== "string" || payload.email.length > 120 || !EMAIL_REGEX.test(payload.email)) {
      details.email = ["Email must be valid and up to 120 characters."];
    }
  }

  if ("age" in payload) {
    const error = validateAge(payload.age);
    if (error) details.age = [error];
  }

  if ("course" in payload) {
    const error = validateStringField(payload.course, "Course", 2, 100);
    if (error) details.course = [error];
  }

  return details;
}

function validateUpdatePayload(payload) {
  if (Object.keys(payload).length === 0) {
    return { details: { body: ["At least one field is required for update."] }, updates: null };
  }

  const allowed = ["name", "email", "age", "course"];
  const details = {};
  const updates = {};

  for (const field of Object.keys(payload)) {
    if (!allowed.includes(field)) {
      details[field] = ["Unknown field."];
    }
  }

  if ("name" in payload) {
    const error = validateStringField(payload.name, "Name", 2, 100);
    if (error) details.name = [error];
    else updates.name = payload.name.trim();
  }

  if ("email" in payload) {
    if (typeof payload.email !== "string" || payload.email.length > 120 || !EMAIL_REGEX.test(payload.email)) {
      details.email = ["Email must be valid and up to 120 characters."];
    } else {
      updates.email = payload.email;
    }
  }

  if ("age" in payload) {
    const error = validateAge(payload.age);
    if (error) details.age = [error];
    else updates.age = payload.age;
  }

  if ("course" in payload) {
    const error = validateStringField(payload.course, "Course", 2, 100);
    if (error) details.course = [error];
    else updates.course = payload.course.trim();
  }

  if (Object.keys(details).length > 0) {
    return { details, updates: null };
  }

  if (Object.keys(updates).length === 0) {
    return { details: { body: ["At least one valid field is required for update."] }, updates: null };
  }

  return { details: null, updates };
}

function studentIdFromPath(path) {
  const match = path.match(/^\/students\/(\d+)$/);
  if (!match) return null;
  return Number.parseInt(match[1], 10);
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return noContentResponse();
  }

  const path = normalizePath(event.path || "/");
  const method = event.httpMethod;

  const db = await loadDb();

  if (path === "/" && method === "GET") {
    return jsonResponse(200, { message: "Student CRUD API is running" });
  }

  if (path === "/students" && method === "GET") {
    const students = [...db.students].sort((a, b) => a.id - b.id);
    return jsonResponse(200, students);
  }

  if (path === "/students" && method === "POST") {
    const parsed = parseJsonBody(event);
    if (!parsed.ok) return parsed.response;

    const payload = parsed.payload;
    const details = validateCreatePayload(payload);
    if (Object.keys(details).length > 0) {
      return validationError(details);
    }

    if (db.students.some((student) => student.email === payload.email)) {
      return jsonResponse(409, { error: "A student with this email already exists." });
    }

    const student = {
      id: db.nextId,
      name: payload.name.trim(),
      email: payload.email,
      age: payload.age,
      course: payload.course.trim(),
    };
    db.nextId += 1;
    db.students.push(student);
    await saveDb(db);
    return jsonResponse(201, student);
  }

  const studentId = studentIdFromPath(path);
  if (studentId !== null) {
    const index = db.students.findIndex((student) => student.id === studentId);
    if (index === -1) {
      return jsonResponse(404, { error: "Student not found." });
    }

    if (method === "GET") {
      return jsonResponse(200, db.students[index]);
    }

    if (method === "PUT") {
      const parsed = parseJsonBody(event);
      if (!parsed.ok) return parsed.response;

      const { details, updates } = validateUpdatePayload(parsed.payload);
      if (details) {
        return validationError(details);
      }

      if (
        updates.email
        && db.students.some((student) => student.id !== studentId && student.email === updates.email)
      ) {
        return jsonResponse(409, { error: "A student with this email already exists." });
      }

      db.students[index] = { ...db.students[index], ...updates };
      await saveDb(db);
      return jsonResponse(200, db.students[index]);
    }

    if (method === "DELETE") {
      db.students.splice(index, 1);
      await saveDb(db);
      return jsonResponse(200, { message: "Student deleted successfully." });
    }

    return jsonResponse(405, { error: "Method not allowed." });
  }

  return jsonResponse(404, { error: "Route not found." });
};
