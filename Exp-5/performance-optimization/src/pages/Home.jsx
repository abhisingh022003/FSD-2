import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>⚡ React Performance Optimization Lab</h1>
        <p className="hero-subtitle">Experiment 5 - Full Stack Development II</p>
        <p className="course-info">AI201 • 4th Semester • AIT-CSE</p>
      </div>

      <div className="features">
        <h2>🎯 Performance Techniques Implemented</h2>
        
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>React.memo</h3>
            <p>Component memoization to prevent unnecessary re-renders</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>useMemo Hook</h3>
            <p>Memoize expensive calculations and derived values</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>useCallback Hook</h3>
            <p>Prevent function recreation on every render</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Code Splitting</h3>
            <p>Lazy loading routes with React.lazy and Suspense</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Virtualization</h3>
            <p>Render only visible items with react-window</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Debouncing</h3>
            <p>Delay expensive operations with custom hooks</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>Image Optimization</h3>
            <p>Lazy loading images with native loading attribute</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Bundle Analysis</h3>
            <p>Visualize bundle size with rollup-plugin-visualizer</p>
            <span className="tech-badge">CO2-BT3</span>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>🚀 Explore the Demo</h2>
        <p>Experience 1500+ products with optimized performance</p>
        <div className="cta-buttons">
          <Link to="/products" className="btn-primary">
            View Product List
          </Link>
          <Link to="/analytics" className="btn-secondary">
            Performance Analytics
          </Link>
          <Link to="/about" className="btn-secondary">
            About This Lab
          </Link>
        </div>
      </div>

      <div className="metrics">
        <h3>📈 Performance Metrics</h3>
        <div className="metric-grid">
          <div className="metric">
            <span className="metric-value">1500+</span>
            <span className="metric-label">Products</span>
          </div>
          <div className="metric">
            <span className="metric-value">&lt;100ms</span>
            <span className="metric-label">Render Time</span>
          </div>
          <div className="metric">
            <span className="metric-value">90+</span>
            <span className="metric-label">Lighthouse Score</span>
          </div>
          <div className="metric">
            <span className="metric-value">60fps</span>
            <span className="metric-label">Smooth Scrolling</span>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <p>Developed by: Student Name • Roll No: XXXXX</p>
        <p>Instructor: Mr. Prince Pal Singh (E18505)</p>
        <p>Academic Session 2025-26 • EVEN Semester</p>
      </footer>
    </div>
  );
};

export default Home;
