# Experiment-20: Implement CI/CD Pipeline for Application Deployment

## Experiment Details
- **Experiment Number:** 20
- **Title:** Implement CI/CD pipeline for application deployment
- **Last Submission Date:** 22nd April, 2026
- **Submission Link:** https://forms.gle/9s2aLpGugZgS4y4KA

## Objectives
1. Integrate CD pipeline in Testing Experiment-16
2. Create Docker images and run containers for backend and frontend
3. Set up CI/CD pipeline using GitHub Actions
4. Automate testing and deployment process
5. Share screenshots of Docker operations and GitHub Actions workflows

## Requirements
- Docker installed and running
- GitHub repository with Actions enabled
- Python 3.10+ for backend
- Node.js 18+ for frontend
- Docker Hub account (for pushing images)

## Project Structure
```
exp20/
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── run.py
│   ├── app/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── tests/
│   │       ├── __init__.py
│   │       ├── test_api.py
│   │       └── test_models.py
│   └── .dockerignore
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── __tests__/
│   └── .dockerignore
├── .github/
│   └── workflows/
│       ├── backend-ci-cd.yml
│       └── frontend-ci-cd.yml
├── docker-compose.yml
└── screenshots/
    ├── docker-backend-build.png
    ├── docker-backend-run.png
    ├── docker-frontend-build.png
    ├── docker-frontend-run.png
    ├── github-actions-workflow.png
    └── github-actions-success.png
```

---

## Part 1: Backend Implementation (Python)

### 1.1 Backend Files

#### Dockerfile
```dockerfile
FROM python:3.10

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=run.py
ENV FLASK_ENV=production

EXPOSE 5000

CMD ["python", "run.py"]
```

#### requirements.txt
```
Flask==2.3.3
Flask-CORS==4.0.0
python-dotenv==1.0.0
pytest==7.4.0
pytest-cov==4.1.0
requests==2.31.0
```

#### run.py
```python
import os
from app import create_app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

#### app/__init__.py
```python
from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    from app.routes import bp
    app.register_blueprint(bp)
    
    return app
```

#### app/config.py
```python
import os

class Config:
    DEBUG = False
    TESTING = False
    JSON_SORT_KEYS = False

class DevelopmentConfig(Config):
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

class ProductionConfig(Config):
    DEBUG = False
```

#### app/routes.py
```python
from flask import Blueprint, jsonify, request

bp = Blueprint('main', __name__)

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

@bp.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'success': True,
        'message': 'Test endpoint working',
        'data': {'version': '1.0.0'}
    }), 200

@bp.route('/api/echo', methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({'echo': data}), 200

@bp.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@bp.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
```

#### app/tests/test_api.py
```python
import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    
    with app.test_client() as client:
        yield client

def test_health_check(client):
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json['status'] == 'healthy'

def test_test_endpoint(client):
    response = client.get('/api/test')
    assert response.status_code == 200
    assert response.json['success'] == True

def test_echo_endpoint(client):
    test_data = {'message': 'Hello World'}
    response = client.post('/api/echo', json=test_data)
    assert response.status_code == 200
    assert response.json['echo'] == test_data

def test_not_found(client):
    response = client.get('/nonexistent')
    assert response.status_code == 404
```

#### .dockerignore
```
__pycache__
.pytest_cache
.env
.git
.gitignore
*.pyc
*.pyo
venv/
.vscode
.DS_Store
```

---

## Part 2: Frontend Implementation (Node.js React)

### 2.1 Frontend Files

#### Dockerfile
```dockerfile
FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit

COPY . .
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

#### package.json
```json
{
  "name": "frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.9",
    "vitest": "^0.34.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0"
  }
}
```

#### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})
```

#### src/App.jsx
```jsx
import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/health`
      )
      setMessage(response.data.message)
      setError(null)
    } catch (err) {
      setError('Failed to connect to backend')
      setMessage('Error')
    }
  }

  return (
    <div className="container">
      <h1>CI/CD Pipeline Demo</h1>
      <p className="status">{message}</p>
      {error && <p className="error">{error}</p>}
      <button onClick={fetchData}>Refresh</button>
    </div>
  )
}

export default App
```

#### src/App.css
```css
.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
}

.status {
  font-size: 18px;
  color: #27ae60;
  font-weight: bold;
}

.error {
  color: #e74c3c;
  margin-top: 10px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #2980b9;
}
```

#### .dockerignore
```
node_modules
.git
.gitignore
npm-debug.log
dist
.env.local
.DS_Store
```

---

## Part 3: Docker Setup

### 3.1 Building Docker Images

#### Backend
```bash
cd backend
docker build -t exp20-backend:latest .
docker run -d -p 5000:5000 --name backend-container exp20-backend:latest
```

#### Frontend
```bash
cd frontend
docker build -t exp20-frontend:latest .
docker run -d -p 5173:5173 --name frontend-container exp20-frontend:latest
```

### 3.2 Docker Compose

Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - PORT=5000
    container_name: exp20-backend
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:5000
    container_name: exp20-frontend
    depends_on:
      - backend
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

Run with Docker Compose:
```bash
docker-compose up -d
```

---

## Part 4: GitHub Actions CI/CD

### 4.1 Backend CI/CD Workflow

Create `.github/workflows/backend-ci-cd.yml`:

```yaml
name: Backend CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'backend/**'
      - '.github/workflows/backend-ci-cd.yml'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'
    
    - name: Install dependencies
      run: |
        cd backend
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        cd backend
        pytest app/tests/ --cov=app --cov-report=xml
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        files: ./backend/coverage.xml
        flags: backend
        fail_ci_if_error: false

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: ./backend
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/exp20-backend:latest
        cache-from: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/exp20-backend:buildcache
        cache-to: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/exp20-backend:buildcache,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Trigger deployment
      run: |
        echo "Deployment triggered for backend"
        # Add your deployment commands here (Vercel, Heroku, AWS, etc.)
```

### 4.2 Frontend CI/CD Workflow

Create `.github/workflows/frontend-ci-cd.yml`:

```yaml
name: Frontend CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'frontend/**'
      - '.github/workflows/frontend-ci-cd.yml'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'frontend/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: './frontend/package-lock.json'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Run linter
      run: |
        cd frontend
        npm run lint || true
    
    - name: Run tests
      run: |
        cd frontend
        npm run test:coverage || true

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: './frontend/package-lock.json'
    
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
    
    - name: Build
      run: |
        cd frontend
        npm run build
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Login to Docker Hub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: ./frontend
        push: true
        tags: ${{ secrets.DOCKER_USERNAME }}/exp20-frontend:latest
        cache-from: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/exp20-frontend:buildcache
        cache-to: type=registry,ref=${{ secrets.DOCKER_USERNAME }}/exp20-frontend:buildcache,mode=max
```

---

## Part 5: Quick Start Guide

### 5.1 Local Development

#### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
# Backend runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

### 5.2 Docker Build & Run

#### Build Images
```bash
# Backend
docker build -t exp20-backend:latest ./backend

# Frontend
docker build -t exp20-frontend:latest ./frontend
```

#### Run Containers
```bash
# Backend
docker run -d -p 5000:5000 --name backend exp20-backend:latest

# Frontend
docker run -d -p 5173:5173 -e VITE_API_URL=http://localhost:5000 --name frontend exp20-frontend:latest
```

#### Using Docker Compose
```bash
docker-compose up -d
```

### 5.3 Testing

#### Backend Tests
```bash
cd backend
pytest app/tests/ --cov=app
```

#### Frontend Tests
```bash
cd frontend
npm run test
npm run test:coverage
```

---

## Part 6: Screenshots Required

Capture and save the following screenshots:

1. **docker-backend-build.png** - Backend Docker image build process
2. **docker-backend-run.png** - Backend container running in CLI
3. **docker-frontend-build.png** - Frontend Docker image build process
4. **docker-frontend-run.png** - Frontend container running in CLI
5. **github-actions-workflow.png** - GitHub Actions workflow configuration
6. **github-actions-success.png** - Successful CI/CD pipeline execution

Place all screenshots in the `screenshots/` folder.

---

## Part 7: GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. `DOCKER_USERNAME` - Your Docker Hub username
2. `DOCKER_PASSWORD` - Your Docker Hub personal access token
3. `DEPLOYMENT_TOKEN` - Your deployment service token (if needed)

Go to: Repository → Settings → Secrets and variables → Actions

---

## Part 8: Useful Commands

### Docker Commands
```bash
# List images
docker images

# List running containers
docker ps

# List all containers
docker ps -a

# View container logs
docker logs <container-id>

# Stop container
docker stop <container-id>

# Remove container
docker rm <container-id>

# Remove image
docker rmi <image-id>

# Build with tag
docker build -t <username>/<image>:<tag> .

# Push to Docker Hub
docker push <username>/<image>:<tag>

# Pull from Docker Hub
docker pull <username>/<image>:<tag>
```

### Git Commands
```bash
# Create new branch
git checkout -b feature-branch

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push to GitHub
git push origin feature-branch

# Create Pull Request
# Go to GitHub and create PR from feature-branch to main
```

---

## Part 9: Submission Checklist

- [ ] Backend Dockerfile created and tested
- [ ] Frontend Dockerfile created and tested
- [ ] Both Docker images build successfully
- [ ] Containers run without errors
- [ ] Backend tests passing (pytest)
- [ ] Frontend builds successfully (npm run build)
- [ ] GitHub Actions workflows created and enabled
- [ ] CI/CD pipeline runs on push/PR
- [ ] Docker images pushed to Docker Hub
- [ ] All 6 screenshots captured
- [ ] README.md completed
- [ ] Code compressed to ZIP file
- [ ] Form submission completed with all required details

---

## Part 10: Troubleshooting

### Docker Build Fails
- Ensure Docker daemon is running: `docker info`
- Check Dockerfile syntax
- Verify all required files are in the directory

### Container Won't Start
- Check logs: `docker logs <container-id>`
- Verify port isn't already in use: `netstat -ano | findstr :5000`
- Check resource constraints

### GitHub Actions Fails
- Check workflow syntax in `.github/workflows/`
- Verify secrets are set correctly
- Check branch protection rules
- View action logs in GitHub

### Backend/Frontend Connection Issues
- Verify CORS is enabled
- Check API endpoint URL
- Ensure containers are on same network (docker-compose)
- Check firewall settings

---

## References

- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [React & Vite Documentation](https://vitejs.dev/)
- [Docker Hub](https://hub.docker.com/)

---

## Author & Date
- **Created:** 20th April, 2026
- **Last Updated:** 20th April, 2026
- **Submission Deadline:** 22nd April, 2026

---

**Good Luck! 🚀**
