const express = require('express');
const { body } = require('express-validator');

const { authenticate } = require('../middleware/auth.middleware');
const { ApiError } = require('../middleware/error.middleware');
const { validateRequest } = require('../middleware/validate.middleware');
const User = require('../models/User');
const { signAuthToken } = require('../utils/token');

const router = express.Router();

router.post(
  '/register',
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Name is required')
      .isLength({ min: 2, max: 60 })
      .withMessage('Name must be between 2 and 60 characters'),
    body('email')
      .trim()
      .isEmail()
      .withMessage('Valid email is required')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return next(new ApiError(409, 'Email already registered'));
      }

      const user = await User.create({ name, email, password });
      const token = signAuthToken(user._id);

      return res.status(201).json({
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      return next(error);
    }
  },
);

router.post(
  '/login',
  [
    body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return next(new ApiError(401, 'Invalid email or password'));
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return next(new ApiError(401, 'Invalid email or password'));
      }

      const token = signAuthToken(user._id);
      return res.json({
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      return next(error);
    }
  },
);

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    return res.json({ user: user.toJSON() });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
