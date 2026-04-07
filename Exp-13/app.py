import os
import socket
from urllib.parse import quote_plus

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, ValidationError, fields, validate
from sqlalchemy.exc import IntegrityError


MYSQL_ENV_KEYS = ("MYSQL_HOST", "MYSQL_PORT", "MYSQL_USER", "MYSQL_PASSWORD", "MYSQL_DB")


def normalize_database_url(database_url: str) -> str:
    if database_url.startswith("mysql://"):
        return database_url.replace("mysql://", "mysql+pymysql://", 1)
    return database_url


def default_sqlite_uri() -> str:
    # Netlify Functions run in a serverless environment where project files are read-only.
    if os.getenv("NETLIFY") == "true":
        return "sqlite:////tmp/student.db"
    sqlite_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "student.db")
    return f"sqlite:///{sqlite_path}"


def build_database_uri() -> str:
    database_url = os.getenv("DATABASE_URL")
    if database_url:
        return normalize_database_url(database_url)

    mysql_host = os.getenv("MYSQL_HOST", "localhost")
    mysql_port = os.getenv("MYSQL_PORT", "3306")
    mysql_user = os.getenv("MYSQL_USER")
    mysql_password = os.getenv("MYSQL_PASSWORD")
    mysql_db = os.getenv("MYSQL_DB")

    mysql_env_present = any(os.getenv(key) is not None for key in MYSQL_ENV_KEYS)
    if not mysql_env_present:
        return default_sqlite_uri()

    missing = [
        key
        for key, value in {
            "MYSQL_USER": mysql_user,
            "MYSQL_PASSWORD": mysql_password,
            "MYSQL_DB": mysql_db,
        }.items()
        if not value
    ]
    if missing:
        raise RuntimeError(
            "Incomplete MySQL configuration. Missing required environment variables: "
            + ", ".join(missing)
            + ". Set DATABASE_URL or MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB."
            + " Or unset MYSQL_* to use the default SQLite database."
        )

    return (
        f"mysql+pymysql://{mysql_user}:{quote_plus(mysql_password)}"
        f"@{mysql_host}:{mysql_port}/{mysql_db}"
    )


def resolve_server_port() -> int:
    raw_port = os.getenv("PORT", "10000")
    try:
        return int(raw_port)
    except ValueError as exc:
        raise RuntimeError(f"Invalid PORT value '{raw_port}'. PORT must be an integer.") from exc


def choose_server_port(preferred_port: int) -> tuple[int, bool]:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        if sock.connect_ex(("127.0.0.1", preferred_port)) != 0:
            return preferred_port, False

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1], True


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = build_database_uri()
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class Student(db.Model):
    __tablename__ = "student"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    age = db.Column(db.Integer, nullable=False)
    course = db.Column(db.String(100), nullable=False)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "age": self.age,
            "course": self.course,
        }


class StudentCreateSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=2, max=100))
    email = fields.Email(required=True, validate=validate.Length(max=120))
    age = fields.Int(required=True, validate=validate.Range(min=1, max=120))
    course = fields.Str(required=True, validate=validate.Length(min=2, max=100))


class StudentUpdateSchema(Schema):
    name = fields.Str(validate=validate.Length(min=2, max=100))
    email = fields.Email(validate=validate.Length(max=120))
    age = fields.Int(validate=validate.Range(min=1, max=120))
    course = fields.Str(validate=validate.Length(min=2, max=100))


student_create_schema = StudentCreateSchema()
student_update_schema = StudentUpdateSchema()


def parse_json_body():
    payload = request.get_json(silent=True)
    if payload is None:
        raise ValidationError({"body": ["Request must contain valid JSON body."]})
    return payload


def get_student_or_none(student_id: int):
    return db.session.get(Student, student_id)


@app.errorhandler(ValidationError)
def handle_validation_error(error: ValidationError):
    return jsonify({"error": "Validation failed", "details": error.messages}), 400


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Student CRUD API is running"})


@app.route("/students", methods=["POST"])
def create_student():
    payload = parse_json_body()
    validated_payload = student_create_schema.load(payload)
    student = Student(**validated_payload)
    db.session.add(student)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "A student with this email already exists."}), 409

    return jsonify(student.to_dict()), 201


@app.route("/students", methods=["GET"])
def get_students():
    students = Student.query.order_by(Student.id.asc()).all()
    return jsonify([student.to_dict() for student in students]), 200


@app.route("/students/<int:student_id>", methods=["GET"])
def get_student(student_id: int):
    student = get_student_or_none(student_id)
    if not student:
        return jsonify({"error": "Student not found."}), 404
    return jsonify(student.to_dict()), 200


@app.route("/students/<int:student_id>", methods=["PUT"])
def update_student(student_id: int):
    student = get_student_or_none(student_id)
    if not student:
        return jsonify({"error": "Student not found."}), 404

    payload = parse_json_body()
    if not payload:
        raise ValidationError({"body": ["At least one field is required for update."]})

    validated_payload = student_update_schema.load(payload)
    if not validated_payload:
        raise ValidationError({"body": ["At least one valid field is required for update."]})

    for key, value in validated_payload.items():
        setattr(student, key, value)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "A student with this email already exists."}), 409

    return jsonify(student.to_dict()), 200


@app.route("/students/<int:student_id>", methods=["DELETE"])
def delete_student(student_id: int):
    student = get_student_or_none(student_id)
    if not student:
        return jsonify({"error": "Student not found."}), 404

    db.session.delete(student)
    db.session.commit()
    return jsonify({"message": "Student deleted successfully."}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    preferred_port = resolve_server_port()
    server_port, used_random_port = choose_server_port(preferred_port)

    if used_random_port:
        print(
            f"Port {preferred_port} is already in use. "
            f"Starting on available port {server_port} instead."
        )

    app.run(host="0.0.0.0", port=server_port, debug=True, use_reloader=False)
