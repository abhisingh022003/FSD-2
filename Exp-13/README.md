# Experiment-13: Flask (Python) Student CRUD API

This project is a **Python Flask backend** with CRUD APIs for students.  
It runs locally with SQLite by default, and supports MySQL via environment variables.

## Features

- Python Flask backend
- CRUD APIs for `student` records
- Marshmallow validation
- SQLAlchemy ORM
- SQLite fallback for local runs
- Render-ready production config (`render.yaml`)

## Local Run

1. Create and activate virtualenv:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start server:
   ```bash
   python3 app.py
   ```

Default local port is `10000`.  
If `10000` is busy, the app auto-selects a random free port.

## Environment Variables

Use either:

- `DATABASE_URL` (recommended for deployment), or
- MySQL vars: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DB`

If no DB vars are provided, SQLite is used.

## Production Deployment

- Render backend config is in `/render.yaml` (repo root).
- Recommended start command on Render is `gunicorn app:app`.
- Use `DATABASE_URL` in Render environment settings for persistent DB.

## Netlify

Netlify is currently set up as a site deployment target, but the Python API should run on Render and be proxied (if needed) from Netlify.
