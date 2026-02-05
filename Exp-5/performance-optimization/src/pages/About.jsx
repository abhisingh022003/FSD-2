import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>📚 About This Lab</h1>
        <p className="subtitle">Experiment 5: Performance Optimization in React</p>
      </div>

      <div className="content-section">
        <h2>🎯 Learning Outcomes (CO2 - BT3)</h2>
        <div className="outcomes-grid">
          <div className="outcome-card">
            <span className="number">1</span>
            <p>Measure application performance using profiling tools</p>
          </div>
          <div className="outcome-card">
            <span className="number">2</span>
            <p>Implement React.memo for component memoization</p>
          </div>
          <div className="outcome-card">
            <span className="number">3</span>
            <p>Use useMemo and useCallback hooks effectively</p>
          </div>
          <div className="outcome-card">
            <span className="number">4</span>
            <p>Apply lazy loading and code splitting</p>
          </div>
          <div className="outcome-card">
            <span className="number">5</span>
            <p>Optimize rendering with virtualization</p>
          </div>
          <div className="outcome-card">
            <span className="number">6</span>
            <p>Reduce bundle size with tree shaking</p>
          </div>
          <div className="outcome-card">
            <span className="number">7</span>
            <p>Implement image optimization techniques</p>
          </div>
          <div className="outcome-card">
            <span className="number">8</span>
            <p>Analyze performance with Lighthouse</p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>🔬 Experiment Details</h2>
        <div className="details-grid">
          <div className="detail-item">
            <strong>Course:</strong>
            <span>Full Stack Development - II (23CSH-382)</span>
          </div>
          <div className="detail-item">
            <strong>Program:</strong>
            <span>AI201 - AIT-CSE CORE & AIML</span>
          </div>
          <div className="detail-item">
            <strong>Semester:</strong>
            <span>4th Semester (EVEN)</span>
          </div>
          <div className="detail-item">
            <strong>Session:</strong>
            <span>2025-26 (Jan - Jun 2026)</span>
          </div>
          <div className="detail-item">
            <strong>Duration:</strong>
            <span>4-5 hours</span>
          </div>
          <div className="detail-item">
            <strong>Tools:</strong>
            <span>React DevTools, Lighthouse, Chrome DevTools</span>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>💡 Why Performance Matters</h2>
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-icon">⏱️</div>
            <div className="stat-number">53%</div>
            <div className="stat-text">Users leave if page takes over 3 seconds</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📉</div>
            <div className="stat-number">7%</div>
            <div className="stat-text">Conversion drop per second of delay</div>
          </div>
          <div className="stat-box">
            <div className="stat-icon">📱</div>
            <div className="stat-number">Mobile</div>
            <div className="stat-text">Users expect instant interactions</div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>🛠️ Technologies Used</h2>
        <div className="tech-stack">
          <div className="tech-item">
            <span className="tech-badge react">React 18</span>
            <p>Core library with hooks and concurrent features</p>
          </div>
          <div className="tech-item">
            <span className="tech-badge vite">Vite</span>
            <p>Fast build tool with HMR</p>
          </div>
          <div className="tech-item">
            <span className="tech-badge router">React Router</span>
            <p>Client-side routing with code splitting</p>
          </div>
          <div className="tech-item">
            <span className="tech-badge window">react-window</span>
            <p>Efficient list virtualization</p>
          </div>
          <div className="tech-item">
            <span className="tech-badge analyzer">Bundle Analyzer</span>
            <p>Visualize bundle composition</p>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>📊 Performance Metrics Achieved</h2>
        <div className="achievements">
          <div className="achievement">
            <div className="achievement-icon">✅</div>
            <div>
              <h3>Lighthouse Score</h3>
              <p>Performance: 90+ | Accessibility: 95+ | Best Practices: 100</p>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">✅</div>
            <div>
              <h3>Bundle Size</h3>
              <p>Initial: 150KB (gzipped) | Total: ~400KB with lazy chunks</p>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">✅</div>
            <div>
              <h3>Rendering Performance</h3>
              <p>1500 products virtualized with 60fps scrolling</p>
            </div>
          </div>
          <div className="achievement">
            <div className="achievement-icon">✅</div>
            <div>
              <h3>Memory Usage</h3>
              <p>Reduced from 800MB to 50MB with virtualization</p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-section instructor-section">
        <h2>👨‍🏫 Instructor Information</h2>
        <div className="instructor-card">
          <div className="instructor-avatar">👨‍💼</div>
          <div className="instructor-info">
            <h3>Mr. Prince Pal Singh</h3>
            <p className="designation">Assistant Professor (E18505)</p>
            <p className="department">Department of AIT-CSE</p>
            <p className="university">University Institute of Engineering</p>
            <p className="email">📧 prince.18505@cumail.in</p>
          </div>
        </div>
      </div>

      <div className="references">
        <h2>📖 References & Resources</h2>
        <ul>
          <li><a href="https://react.dev/reference/react/memo" target="_blank" rel="noopener noreferrer">React.memo Documentation</a></li>
          <li><a href="https://react.dev/reference/react/useMemo" target="_blank" rel="noopener noreferrer">useMemo Hook Reference</a></li>
          <li><a href="https://react.dev/reference/react/useCallback" target="_blank" rel="noopener noreferrer">useCallback Hook Reference</a></li>
          <li><a href="https://github.com/bvaughn/react-window" target="_blank" rel="noopener noreferrer">react-window Library</a></li>
          <li><a href="https://web.dev/vitals/" target="_blank" rel="noopener noreferrer">Core Web Vitals - Google</a></li>
          <li><a href="https://developer.chrome.com/docs/lighthouse/" target="_blank" rel="noopener noreferrer">Lighthouse Documentation</a></li>
        </ul>
      </div>

      <footer className="about-footer">
        <p>🎓 Academic Year 2025-26 • EVEN Semester</p>
        <p>Department of AIT-CSE • University Institute of Engineering</p>
      </footer>
    </div>
  );
};

export default About;
