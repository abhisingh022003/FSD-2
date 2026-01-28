import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="page-container error-page">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <p className="requested-path">
        Requested path: <code>{location.pathname}</code>
      </p>
      
      <div className="error-suggestions">
        <p>Here are some helpful links:</p>
        <ul>
          <li><Link to="/">Go to Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}
