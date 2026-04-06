import { useCallback, useEffect, useMemo, useState } from 'react';
import AuthPanel from './components/AuthPanel';
import ExternalPosts from './components/ExternalPosts';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { setAuthFailureHandler } from './services/apiClient';
import { apiService } from './services/apiService';
import './App.css';

function toErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [taskError, setTaskError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [savingTask, setSavingTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [initializing, setInitializing] = useState(true);

  const pendingTasksCount = useMemo(
    () => tasks.filter((task) => task.status !== 'done').length,
    [tasks],
  );

  const loadTasks = useCallback(async ({ q, status } = {}) => {
    setLoadingTasks(true);
    setTaskError('');

    try {
      const fetchedTasks = await apiService.getTasks({
        q: q || undefined,
        status: status && status !== 'all' ? status : undefined,
      });
      setTasks(fetchedTasks);
    } catch (error) {
      setTaskError(toErrorMessage(error, 'Unable to load tasks.'));
    } finally {
      setLoadingTasks(false);
    }
  }, []);

  const restoreSession = useCallback(async () => {
    try {
      const profile = await apiService.getProfile();
      setUser(profile.user);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutRef = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 450);

    return () => window.clearTimeout(timeoutRef);
  }, [query]);

  useEffect(() => {
    setAuthFailureHandler(() => {
      setUser(null);
      setTasks([]);
      setEditingTask(null);
      setTaskError('Session expired. Please log in again.');
    });

    return () => {
      setAuthFailureHandler(null);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setInitializing(false);
      return;
    }

    restoreSession();
  }, [restoreSession]);

  useEffect(() => {
    if (!user) {
      return;
    }

    loadTasks({ q: debouncedQuery, status: statusFilter });
  }, [debouncedQuery, loadTasks, statusFilter, user]);

  const handleAuthenticated = (authResponse) => {
    localStorage.setItem('token', authResponse.token);
    setUser(authResponse.user);
    setTaskError('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setTasks([]);
    setEditingTask(null);
    setQuery('');
    setDebouncedQuery('');
    setStatusFilter('all');
    setTaskError('');
  };

  const handleTaskSubmit = async (taskPayload) => {
    setSavingTask(true);
    setTaskError('');

    try {
      if (editingTask) {
        await apiService.updateTask(editingTask._id, taskPayload);
        setEditingTask(null);
      } else {
        await apiService.createTask(taskPayload);
      }

      await loadTasks({ q: debouncedQuery, status: statusFilter });
    } catch (error) {
      setTaskError(toErrorMessage(error, 'Unable to save task.'));
    } finally {
      setSavingTask(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiService.deleteTask(taskId);
      if (editingTask?._id === taskId) {
        setEditingTask(null);
      }
      await loadTasks({ q: debouncedQuery, status: statusFilter });
    } catch (error) {
      setTaskError(toErrorMessage(error, 'Unable to delete task.'));
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await apiService.patchTask(taskId, { status });
      await loadTasks({ q: debouncedQuery, status: statusFilter });
    } catch (error) {
      setTaskError(toErrorMessage(error, 'Unable to update task status.'));
    }
  };

  if (initializing) {
    return (
      <main className="app-shell">
        <p className="status-text">Restoring session...</p>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>Experiment 7: API Integration and Backend Communication</h1>
          <p>Axios + JWT + CRUD API + External API fetch + Error handling</p>
        </div>
        {user && (
          <div className="user-chip">
            <span>{user.name}</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      {!user ? (
        <section className="card">
          <h2>Authentication</h2>
          <p className="muted-text">Register or login to access secured CRUD operations.</p>
          <AuthPanel onAuthenticated={handleAuthenticated} />
        </section>
      ) : (
        <section className="dashboard-grid">
          <article className="card">
            <h2>{editingTask ? 'Update Task' : 'Create Task'}</h2>
            <TaskForm
              key={editingTask?._id || 'new-task'}
              initialTask={editingTask}
              onSubmit={handleTaskSubmit}
              onCancel={() => setEditingTask(null)}
              submitting={savingTask}
            />
          </article>

          <article className="card">
            <div className="section-header">
              <h2>Task Dashboard</h2>
              <p className="muted-text">{pendingTasksCount} active task(s)</p>
            </div>

            <div className="filters-row">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or description"
              />
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <TaskList
              tasks={tasks}
              loading={loadingTasks}
              error={taskError}
              onEdit={setEditingTask}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          </article>
        </section>
      )}

      <section className="card">
        <ExternalPosts />
      </section>
    </main>
  );
}

export default App;
