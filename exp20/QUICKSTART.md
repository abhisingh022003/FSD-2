# Experiment-20: Quick Start Guide

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git installed
- Node.js 18+ (for local frontend development)
- Python 3.10+ (for local backend development)

### Option 1: Using Docker Compose (Recommended)

```bash
# Navigate to project directory
cd exp20

# Build and start both services
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f

# Access services
# Backend: http://localhost:5000/health
# Frontend: http://localhost:5173
```

### Option 2: Manual Docker Build

#### Backend
```bash
cd backend

# Build image
docker build -t exp20-backend:latest .

# Run container
docker run -d -p 5000:5000 --name backend exp20-backend:latest

# View logs
docker logs -f backend
```

#### Frontend
```bash
cd frontend

# Build image
docker build -t exp20-frontend:latest .

# Run container
docker run -d -p 5173:5173 --name frontend exp20-frontend:latest

# View logs
docker logs -f frontend
```

### Option 3: Local Development

#### Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run tests
pytest app/tests/ --cov=app

# Start server
python run.py

# Server runs at http://localhost:5000
```

#### Frontend
```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Frontend runs at http://localhost:5173
```

---

## 📋 Verification Steps

### 1. Test Backend Endpoints

```bash
# Health check
curl http://localhost:5000/health

# Test endpoint
curl http://localhost:5000/api/test

# Echo endpoint
curl -X POST http://localhost:5000/api/echo \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### 2. Test Frontend

Open browser: `http://localhost:5173`

You should see:
- "CI/CD Pipeline Demo" heading
- "Backend is running" status message
- Refresh button

### 3. Docker Verification

```bash
# List images
docker images | grep exp20

# List containers
docker ps | grep exp20

# Check container health
docker ps -a --format "table {{.Names}}\t{{.Status}}"
```

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process using port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
taskkill /F /PID <PID>  # Windows
```

### Frontend won't start
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Docker build fails
```bash
# Check Docker daemon
docker info

# View build logs with verbose output
docker build -t exp20-backend:latest --progress=plain ./backend

# Clear Docker cache
docker system prune -a
```

### Cannot connect between containers
```bash
# Verify network
docker network ls
docker network inspect exp20_app-network

# Rebuild with compose
docker-compose down
docker-compose up -d
```

---

## 📊 Docker Commands Reference

```bash
# Images
docker images                          # List images
docker build -t name:tag .            # Build image
docker rmi image-id                   # Remove image
docker tag old-name new-name          # Rename image

# Containers
docker ps                              # List running containers
docker ps -a                           # List all containers
docker run -d -p 8080:5000 image      # Run container
docker stop container-id              # Stop container
docker start container-id             # Start container
docker rm container-id                # Remove container

# Logs & Debugging
docker logs container-id              # View logs
docker logs -f container-id           # Follow logs
docker exec -it container bash        # Open shell
docker inspect container-id           # View details

# Docker Compose
docker-compose up -d                  # Start services
docker-compose down                   # Stop services
docker-compose logs -f                # Follow logs
docker-compose ps                     # List services
docker-compose build                  # Build images
docker-compose restart                # Restart services
```

---

## 📦 Git & GitHub Setup

```bash
# Initialize repository
git init
git add .
git commit -m "Initial commit: CI/CD pipeline setup"

# Add remote
git remote add origin https://github.com/username/exp20.git

# Create main branch
git branch -M main
git push -u origin main

# Add secrets in GitHub (Settings > Secrets)
# - DOCKER_USERNAME
# - DOCKER_PASSWORD
```

---

## ✅ Submission Checklist

- [ ] Docker images built successfully
- [ ] Containers running without errors
- [ ] Backend API responding to requests
- [ ] Frontend loads and displays correctly
- [ ] Docker Compose working properly
- [ ] GitHub Actions workflows created
- [ ] Screenshots captured (6 total)
- [ ] README.md completed
- [ ] All code in repository
- [ ] Submission form filled out

---

## 🔗 Useful Resources

- **Docker Docs:** https://docs.docker.com/
- **GitHub Actions:** https://github.com/features/actions
- **Flask Docs:** https://flask.palletsprojects.com/
- **React Docs:** https://react.dev/
- **Vite Docs:** https://vitejs.dev/

---

**Last Updated:** 20th April, 2026
**Deadline:** 22nd April, 2026

Good Luck! 🎉
