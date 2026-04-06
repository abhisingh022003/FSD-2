import { useState } from 'react';
import { apiService } from '../services/apiService';

function toErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

const initialFormState = {
  name: '',
  email: '',
  password: '',
};

function AuthPanel({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isRegister = mode === 'register';

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  const onChangeField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = isRegister
        ? form
        : {
            email: form.email,
            password: form.password,
          };

      const response = isRegister ? await apiService.register(payload) : await apiService.login(payload);
      onAuthenticated(response);
      setForm(initialFormState);
    } catch (requestError) {
      setError(toErrorMessage(requestError, 'Authentication failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-toggle">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => switchMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      <form className="form-stack" onSubmit={onSubmit}>
        {isRegister && (
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChangeField}
              required
              minLength={2}
              maxLength={60}
              placeholder="Enter your name"
            />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChangeField}
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChangeField}
            required
            minLength={6}
            placeholder="At least 6 characters"
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AuthPanel;
