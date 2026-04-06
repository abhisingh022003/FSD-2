const axios = require('axios');
const express = require('express');
const { query } = require('express-validator');

const { ApiError } = require('../middleware/error.middleware');
const { validateRequest } = require('../middleware/validate.middleware');

const router = express.Router();

router.get(
  '/posts',
  [
    query('limit')
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage('Limit must be between 1 and 20'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const limit = Number.parseInt(req.query.limit || '5', 10);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
        timeout: 8000,
      });

      const posts = response.data.slice(0, limit).map(({ id, userId, title, body }) => ({
        id,
        userId,
        title,
        body,
      }));

      return res.json({
        count: posts.length,
        posts,
      });
    } catch (_error) {
      return next(new ApiError(502, 'Unable to fetch data from external API'));
    }
  },
);

module.exports = router;
