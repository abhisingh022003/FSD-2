const jwt = require('jsonwebtoken');

const { ApiError } = require('./error.middleware');

function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authorization token is required'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub };
    return next();
  } catch (_error) {
    return next(new ApiError(401, 'Invalid or expired token'));
  }
}

module.exports = {
  authenticate,
};
