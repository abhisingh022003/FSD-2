const { validationResult } = require('express-validator');

const { ApiError } = require('./error.middleware');

function validateRequest(req, _res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const details = errors.array().map(({ msg, path }) => ({
    field: path,
    message: msg,
  }));

  return next(new ApiError(400, 'Validation failed', details));
}

module.exports = {
  validateRequest,
};
