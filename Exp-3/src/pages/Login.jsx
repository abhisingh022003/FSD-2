import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      localStorage.setItem('isAuthenticated', 'true');
      alert('Login successful!');
      navigate('/dashboard');
    } else {
      alert('Please enter username and password');
    }
  };

  return (
    <div className="page-container">
      <h1>Login</h1>
      <p>Login to access the protected dashboard</p>
      
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      <p className="hint">Tip: Use any username and password to login for demo purposes</p>
    </div>
  );
}
