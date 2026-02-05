import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = React.memo(() => {
  console.log('Navigation rendering');
  
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="logo">⚡</span>
          <span className="brand-text">Performance Lab</span>
        </div>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              🏠 Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
              📦 Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
              📊 Analytics
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
              📚 About
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;
