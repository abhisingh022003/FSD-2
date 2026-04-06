function formatDate(isoDate) {
  if (!isoDate) {
    return 'Unknown';
  }

  return new Date(isoDate).toLocaleString();
}

function statusLabel(status) {
  if (status === 'in_progress') {
    return 'In Progress';
  }

  if (status === 'done') {
    return 'Done';
  }

  return 'Pending';
}

function TaskList({ tasks, loading, error, onEdit, onDelete, onStatusChange }) {
  if (loading) {
    return <p className="status-text">Loading tasks...</p>;
  }

  return (
    <div>
      {error && <p className="error-text">{error}</p>}
      {!tasks.length ? (
        <p className="status-text">No tasks found for this filter.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-main">
                <h3>{task.title}</h3>
                <p>{task.description || 'No description provided.'}</p>
                <small>Updated: {formatDate(task.updatedAt)}</small>
              </div>

              <div className="task-actions">
                <span className={`status-pill ${task.status}`}>{statusLabel(task.status)}</span>

                <select
                  value={task.status}
                  onChange={(event) => onStatusChange(task._id, event.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <button type="button" className="ghost-button" onClick={() => onEdit(task)}>
                  Edit
                </button>
                <button type="button" className="danger-button" onClick={() => onDelete(task._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
