# Experiment 7: API Integration and Backend Communication

**Course:** Full Stack - II (23CSH-382)  
**Session:** Academic Session 2025–26 (EVEN Semester Jan–Jun 2026)  
**CO3 - BT3 Practical**

This project implements a complete full-stack CRUD application to cover Experiment 7 outcomes:

- REST API with `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Axios-based frontend/backend communication
- JWT authentication and protected routes
- API error handling and loading states
- React Error Boundary integration
- External API integration (JSONPlaceholder)
- Database-backed backend (MongoDB with Mongoose)

---

## Project Structure

```text
Exp7/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## Backend Setup (`backend/`)

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `.env` from template:

```bash
cp .env.example .env
```

3. Update values in `.env`:

- `MONGODB_URI`: local/remote MongoDB connection string
- `JWT_SECRET`: long random secret

4. Start backend:

```bash
npm run dev
```

Backend runs by default at `http://localhost:5000`.

---

## Frontend Setup (`frontend/`)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create `.env` from template:

```bash
cp .env.example .env
```

3. Start frontend:

```bash
npm run dev
```

Frontend runs by default at `http://localhost:5173`.

---

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current user (protected)

### Tasks (Protected)
- `GET /api/tasks` - List tasks (`status`, `q` query supported)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Full update
- `PATCH /api/tasks/:id` - Partial update
- `DELETE /api/tasks/:id` - Delete task

### External API Integration
- `GET /api/external/posts?limit=4` - Fetch posts from JSONPlaceholder via backend

---

## Experiment Outcomes Covered

1. **REST APIs and HTTP methods** — implemented in backend task routes.
2. **External API fetch** — `/api/external/posts` endpoint and frontend display.
3. **Loading/error states** — all frontend request flows handle both.
4. **Error boundary** — `frontend/src/components/ErrorBoundary.jsx`.
5. **Axios usage** — centralized in `apiClient` + `apiService`.
6. **Authentication tokens** — JWT stored in localStorage and injected by interceptor.
7. **CRUD with backend** — full task CRUD implemented.
8. **Real backend integration** — React app uses Express API + MongoDB.

---

## Useful Scripts

### Backend
- `npm run dev` - start with nodemon
- `npm run start` - start normally
- `npm run check` - syntax check entry file

### Frontend
- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run lint` - lint source code

---

## Tech Stack

- **Frontend:** React, Axios, Vite
- **Backend:** Node.js, Express, Mongoose, JWT
- **Database:** MongoDB
