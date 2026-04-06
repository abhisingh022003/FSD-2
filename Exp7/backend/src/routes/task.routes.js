const express = require('express');
const { body, param, query } = require('express-validator');

const { authenticate } = require('../middleware/auth.middleware');
const { ApiError } = require('../middleware/error.middleware');
const { validateRequest } = require('../middleware/validate.middleware');
const { Task, TASK_STATUSES } = require('../models/Task');

const router = express.Router();

router.use(authenticate);

const taskIdValidator = [param('id').isMongoId().withMessage('Task id must be valid')];

router.get(
  '/',
  [
    query('status')
      .optional()
      .isIn(TASK_STATUSES)
      .withMessage(`Status must be one of: ${TASK_STATUSES.join(', ')}`),
    query('q')
      .optional()
      .isString()
      .isLength({ max: 120 })
      .withMessage('Search query must be 120 characters or less'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { q, status } = req.query;
      const filters = { owner: req.user.id };

      if (status) {
        filters.status = status;
      }

      if (q) {
        filters.$or = [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
        ];
      }

      const tasks = await Task.find(filters).sort({ createdAt: -1 });
      return res.json({ tasks });
    } catch (error) {
      return next(error);
    }
  },
);

router.get('/:id', [...taskIdValidator, validateRequest], async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    return res.json({ task });
  } catch (error) {
    return next(error);
  }
});

router.post(
  '/',
  [
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 120 })
      .withMessage('Title must be 120 characters or less'),
    body('description')
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage('Description must be 500 characters or less'),
    body('status')
      .optional()
      .isIn(TASK_STATUSES)
      .withMessage(`Status must be one of: ${TASK_STATUSES.join(', ')}`),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description || '',
        status: req.body.status || 'pending',
        owner: req.user.id,
      });

      return res.status(201).json({ task });
    } catch (error) {
      return next(error);
    }
  },
);

router.put(
  '/:id',
  [
    ...taskIdValidator,
    body('title')
      .trim()
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 120 })
      .withMessage('Title must be 120 characters or less'),
    body('description')
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage('Description must be 500 characters or less'),
    body('status')
      .isIn(TASK_STATUSES)
      .withMessage(`Status must be one of: ${TASK_STATUSES.join(', ')}`),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

      if (!task) {
        return next(new ApiError(404, 'Task not found'));
      }

      task.title = req.body.title;
      task.description = req.body.description || '';
      task.status = req.body.status;
      await task.save();

      return res.json({ task });
    } catch (error) {
      return next(error);
    }
  },
);

router.patch(
  '/:id',
  [
    ...taskIdValidator,
    body('title')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Title cannot be empty')
      .isLength({ max: 120 })
      .withMessage('Title must be 120 characters or less'),
    body('description')
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage('Description must be 500 characters or less'),
    body('status')
      .optional()
      .isIn(TASK_STATUSES)
      .withMessage(`Status must be one of: ${TASK_STATUSES.join(', ')}`),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

      if (!task) {
        return next(new ApiError(404, 'Task not found'));
      }

      if (req.body.title !== undefined) {
        task.title = req.body.title;
      }

      if (req.body.description !== undefined) {
        task.description = req.body.description;
      }

      if (req.body.status !== undefined) {
        task.status = req.body.status;
      }

      await task.save();
      return res.json({ task });
    } catch (error) {
      return next(error);
    }
  },
);

router.delete('/:id', [...taskIdValidator, validateRequest], async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return next(new ApiError(404, 'Task not found'));
    }

    await task.deleteOne();
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
