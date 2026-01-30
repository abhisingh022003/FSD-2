import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

function ContextDemo() {
  const { user, isLoggedIn, login, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && email) {
      login({ name: username, email });
      setUsername('');
      setEmail('');
    }
  };

  return (
    <div className="context-demo">
      <h2>Context API Demo</h2>
      
      {/* Theme Toggle */}
      <div className="control-panel">
        <h3>{t('theme')}</h3>
        <button onClick={toggleTheme} className="btn-theme">
          {theme === 'light' ? '🌙 ' + t('darkMode') : '☀️ ' + t('lightMode')}
        </button>
      </div>

      {/* Language Selector */}
      <div className="control-panel">
        <h3>{t('language')}</h3>
        <select 
          value={language} 
          onChange={(e) => changeLanguage(e.target.value)}
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="es">Español</option>
        </select>
      </div>

      {/* User Authentication */}
      <div className="auth-section">
        <h3>{t('welcome')}</h3>
        {isLoggedIn ? (
          <div className="user-info">
            <p>✅ {t('username')}: {user.name}</p>
            <p>📧 {t('email')}: {user.email}</p>
            <button onClick={logout} className="btn-logout">
              {t('logout')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder={t('username')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">
              {t('login')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContextDemo;
