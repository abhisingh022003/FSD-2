import { Link, useLocation } from 'react-router-dom';

const BREADCRUMB_LABELS = {
  '': 'Home',
  'about': 'About',
  'products': 'Products',
  'contact': 'Contact',
  'login': 'Login',
  'dashboard': 'Dashboard',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-link">Home</Link>
      
      {pathSegments.map((segment, index) => {
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = BREADCRUMB_LABELS[segment] || segment;
        const isLast = index === pathSegments.length - 1;

        return (
          <span key={path}>
            <span className="breadcrumb-separator"> / </span>
            {isLast ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={path} className="breadcrumb-link">{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
