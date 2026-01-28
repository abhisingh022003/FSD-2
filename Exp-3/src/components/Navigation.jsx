import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navigation() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">SPA Router</div>
        
        <button 
          className="menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClass}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}
          {!isAuthenticated ? (
            <li>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
