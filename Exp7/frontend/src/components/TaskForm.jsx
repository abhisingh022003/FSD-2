import { useState } from 'react';

function buildTaskState(initialTask) {
  if (!initialTask) {
    return {
      title: '',
      description: '',
      status: 'pending',
    };
  }

  return {
    title: initialTask.title,
    description: initialTask.description || '',
    status: initialTask.status,
  };
}

function TaskForm({ initialTask, onSubmit, onCancel, submitting }) {
  const [task, setTask] = useState(() => buildTaskState(initialTask));

  const onChange = (event) => {
    const { name, value } = event.target;
    setTask((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      title: task.title.trim(),
      description: task.description.trim(),
      status: task.status,
    });
  };

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={onChange}
          required
          maxLength={120}
          placeholder="Write assignment report"
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={task.description}
          onChange={onChange}
          rows={4}
          maxLength={500}
          placeholder="Task details..."
        />
      </label>

      <label>
        Status
        <select name="status" value={task.status} onChange={onChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </label>

      <div className="button-row">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : initialTask ? 'Update Task' : 'Create Task'}
        </button>
        {initialTask && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
