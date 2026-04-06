class ApiError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

function notFoundHandler(req, _res, next) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';

  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid resource identifier';
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Resource already exists';
  }

  const payload = { message };
  if (error.details) {
    payload.details = error.details;
  }

  if (process.env.NODE_ENV !== 'production' && statusCode >= 500) {
    payload.stack = error.stack;
  }

  res.status(statusCode).json(payload);
}

module.exports = {
  ApiError,
  notFoundHandler,
  errorHandler,
};
