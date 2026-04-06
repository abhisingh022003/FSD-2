const mongoose = require('mongoose');

const TASK_STATUSES = ['pending', 'in_progress', 'done'];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: TASK_STATUSES,
      default: 'pending',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = {
  Task: mongoose.model('Task', taskSchema),
  TASK_STATUSES,
};
