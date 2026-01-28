import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <h1>Protected Dashboard</h1>
      <p>Welcome! You are authenticated and can view this protected route.</p>
      
      <div className="dashboard-content">
        <div className="card">
          <h2>Statistics</h2>
          <ul>
            <li>Total Users: 1,234</li>
            <li>Active Sessions: 45</li>
            <li>Total Revenue: $12,345</li>
          </ul>
        </div>

        <div className="card">
          <h2>Quick Actions</h2>
          <ul>
            <li>View Reports</li>
            <li>Manage Users</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>

      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}
