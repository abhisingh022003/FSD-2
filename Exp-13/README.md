# Experiment-13: Student CRUD API (Netlify Deployment)

This project is deployed as a **Netlify Function API** (no Render/Railway/other backend host).
It keeps the same CRUD routes used in the Python app.

## Features

- Netlify serverless API (`netlify/functions/api.js`)
- CRUD APIs for `student` records
- Input validation and duplicate email checks

## Netlify

- Function file: `netlify/functions/api.js`
- Redirect config: `netlify.toml`
- All routes are served through Netlify:
  - `GET /`
  - `POST /students`
  - `GET /students`
  - `GET /students/:id`
  - `PUT /students/:id`
  - `DELETE /students/:id`
