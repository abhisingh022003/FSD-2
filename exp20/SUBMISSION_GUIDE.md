# Experiment-20 Submission Guide

## 📋 Experiment Details

**Title:** Implement CI/CD pipeline for application deployment

**Submission Deadline:** 22nd April, 2026

**Submission Form:** https://forms.gle/9s2aLpGugZgS4y4KA

**Marks:** 30

---

## 📁 Project Structure

```
exp20/
├── README.md                           # Main documentation
├── QUICKSTART.md                       # Quick start guide
├── docker-compose.yml                  # Docker Compose configuration
├── .gitignore                          # Git ignore patterns
├── backend/
│   ├── Dockerfile                      # Backend container image
│   ├── .dockerignore                   # Files to ignore in Docker build
│   ├── requirements.txt                # Python dependencies
│   ├── run.py                          # Application entry point
│   ├── app/
│   │   ├── __init__.py                 # Flask app factory
│   │   ├── routes.py                   # API endpoints
│   │   └── tests/
│   │       ├── __init__.py
│   │       └── test_api.py             # Pytest test suite
│   └── venv/                           # Virtual environment (excluded from submission)
├── frontend/
│   ├── Dockerfile                      # Frontend container image
│   ├── .dockerignore                   # Files to ignore in Docker build
│   ├── package.json                    # Node.js dependencies
│   ├── package-lock.json               # Dependency lock file
│   ├── index.html                      # Vite entry point
│   ├── vite.config.js                  # Vite configuration
│   ├── src/
│   │   ├── main.jsx                    # React entry point
│   │   ├── App.jsx                     # Main React component
│   │   ├── App.css                     # Component styling
│   │   └── index.css                   # Global styles
│   └── node_modules/                   # Dependencies (excluded from submission)
├── .github/
│   └── workflows/
│       ├── backend-ci-cd.yml           # Backend GitHub Actions workflow
│       └── frontend-ci-cd.yml          # Frontend GitHub Actions workflow
└── screenshots/
    ├── docker-backend-build.png        # Backend Docker build output
    ├── docker-backend-run.png          # Backend container running
    ├── docker-frontend-build.png       # Frontend Docker build output
    ├── docker-frontend-run.png         # Frontend container running
    ├── github-actions-workflow.png     # GitHub Actions workflow file
    └── github-actions-success.png      # GitHub Actions execution success
```

---

## 🎯 Requirements Checklist

### Backend Implementation
- [x] Flask application with proper structure
- [x] API endpoints: `/health`, `/api/test`, `/api/echo`
- [x] Error handling (404, 500)
- [x] Pytest test suite
- [x] Docker image configuration
- [x] Requirements.txt with all dependencies

### Frontend Implementation
- [x] React application with Vite
- [x] Component to display backend health status
- [x] CSS styling
- [x] Environment variable support (VITE_API_URL)
- [x] Docker image configuration
- [x] Package.json with dependencies

### Docker Setup
- [x] Backend Dockerfile (Python 3.10)
- [x] Frontend Dockerfile (Node 18)
- [x] .dockerignore files for both
- [x] docker-compose.yml for orchestration
- [x] Network configuration for service communication

### CI/CD Setup
- [x] GitHub Actions workflow for backend
  - Testing with pytest
  - Docker image build and push
  - Coverage reporting
- [x] GitHub Actions workflow for frontend
  - Dependency installation
  - Build verification
  - Docker image build and push
- [x] Workflow triggers on push and pull requests
- [x] Environment variables for API communication

### Documentation
- [x] README.md with 10 sections
- [x] QUICKSTART.md with common commands
- [x] Code comments where needed
- [x] Installation and setup instructions

### Screenshots (Required - 6 Total)
1. Docker backend build output
2. Docker backend container running (docker ps)
3. Docker frontend build output
4. Docker frontend container running (docker ps)
5. GitHub Actions workflow file content
6. GitHub Actions successful execution

---

## 🚀 Setup Instructions for Evaluator

### Step 1: Extract and Navigate
```bash
unzip exp20.zip
cd exp20
```

### Step 2: Build with Docker Compose
```bash
docker-compose build
docker-compose up -d
```

### Step 3: Verify Services
```bash
# Check running containers
docker-compose ps

# Test backend
curl http://localhost:5000/health

# Test frontend
open http://localhost:5173  # macOS
# or
start http://localhost:5173  # Windows
# or
xdg-open http://localhost:5173  # Linux
```

### Step 4: Run Tests
```bash
# Backend tests
cd backend
pytest app/tests/ --cov=app

# Frontend tests
cd ../frontend
npm install
npm run test
```

### Step 5: View Documentation
- **Main Documentation:** README.md
- **Quick Reference:** QUICKSTART.md
- **GitHub Actions:** .github/workflows/*.yml

---

## 📸 Screenshots Required

### 1. Docker Backend Build
```bash
docker build -t exp20-backend:latest ./backend
```
Take screenshot of build output showing "Successfully tagged"

### 2. Docker Backend Running
```bash
docker run -d -p 5000:5000 --name backend exp20-backend:latest
docker ps | grep backend
```
Take screenshot showing container running

### 3. Docker Frontend Build
```bash
docker build -t exp20-frontend:latest ./frontend
```
Take screenshot of build output showing "Successfully tagged"

### 4. Docker Frontend Running
```bash
docker run -d -p 5173:5173 --name frontend exp20-frontend:latest
docker ps | grep frontend
```
Take screenshot showing container running

### 5. GitHub Actions Workflow
Screenshot of `.github/workflows/backend-ci-cd.yml` or `frontend-ci-cd.yml` in editor

### 6. GitHub Actions Success
Screenshot of GitHub Actions tab showing successful workflow execution with green checkmarks

---

## 📦 Files to Include in Submission

### DO Include:
- ✅ README.md
- ✅ QUICKSTART.md
- ✅ docker-compose.yml
- ✅ .gitignore
- ✅ backend/ folder (all files except node_modules, venv, __pycache__)
- ✅ frontend/ folder (all files except node_modules, dist)
- ✅ .github/ folder (workflows)
- ✅ screenshots/ folder (6 required images)

### DO NOT Include:
- ❌ node_modules/ (regenerated by `npm install`)
- ❌ venv/ (regenerated by `python -m venv`)
- ❌ __pycache__/
- ❌ .pyc files
- ❌ .env files (with real credentials)
- ❌ dist/ (frontend build output)
- ❌ .DS_Store (macOS)
- ❌ *.log files

---

## 🔧 Configuration for GitHub Actions

### Required Secrets (GitHub Settings > Secrets):
If pushing to Docker Hub:
- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password token

### Optional Environment Variables:
Frontend can use environment variables:
- `VITE_API_URL`: Backend API URL (default: http://localhost:5000)

In docker-compose.yml:
```yaml
environment:
  - VITE_API_URL=http://backend:5000
```

---

## ✨ Features Implemented

### Backend
1. ✅ Health check endpoint for monitoring
2. ✅ Test endpoint for connectivity verification
3. ✅ Echo endpoint for data validation
4. ✅ Error handling for edge cases
5. ✅ Comprehensive pytest test suite
6. ✅ Production-ready Flask application

### Frontend
1. ✅ React component with hooks
2. ✅ Axios HTTP client for API calls
3. ✅ Error handling and user feedback
4. ✅ Refresh functionality
5. ✅ Responsive CSS styling
6. ✅ Vite build configuration

### DevOps
1. ✅ Multi-stage Docker builds
2. ✅ Docker Compose orchestration
3. ✅ GitHub Actions CI/CD
4. ✅ Automated testing on push
5. ✅ Docker image building and pushing
6. ✅ Network isolation and communication

---

## 🔗 Important Links

- **Submission Form:** https://forms.gle/9s2aLpGugZgS4y4KA
- **Deadline:** 22nd April, 2026
- **Docker Documentation:** https://docs.docker.com/
- **GitHub Actions Guide:** https://github.com/features/actions
- **GitHub Actions Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

## 📝 Notes

1. **Testing:** Run tests locally before pushing to ensure all pass
2. **Docker:** Ensure Docker Desktop is running before using docker-compose
3. **Screenshots:** Capture in clear, readable format (PNG recommended)
4. **Documentation:** Keep README updated with any changes
5. **Credentials:** Never commit secrets; use GitHub Secrets instead

---

## ❓ FAQs

**Q: What if port 5000/5173 is already in use?**
A: Modify docker-compose.yml ports mapping:
```yaml
ports:
  - "8000:5000"  # Host:Container
```

**Q: How do I push images to Docker Hub?**
A: Add secrets to GitHub and uncomment the Docker push step in workflows

**Q: Can I run backend and frontend separately?**
A: Yes, see QUICKSTART.md for manual Docker build instructions

**Q: How do I test locally without Docker?**
A: Install dependencies (pip/npm) and run run.py / npm run dev

**Q: What if tests fail?**
A: Check QUICKSTART.md troubleshooting section or README.md

---

## 📞 Support

For issues or questions:
1. Check README.md troubleshooting section
2. Review QUICKSTART.md for common commands
3. Consult Docker and GitHub Actions documentation
4. Review workflow files for implementation details

---

**Good Luck with your submission! 🎉**

Last Updated: 20th April, 2026
