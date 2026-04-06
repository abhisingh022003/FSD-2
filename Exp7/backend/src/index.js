const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const externalRoutes = require('./routes/external.routes');
const taskRoutes = require('./routes/task.routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

dotenv.config();

const requiredEnv = ['MONGODB_URI', 'JWT_SECRET'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    // Explicit startup failure keeps auth/db issues visible.
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const app = express();
const port = Number.parseInt(process.env.PORT || '5000', 10);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: clientOrigin }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/external', externalRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer() {
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend server:', error.message);
  process.exit(1);
});
