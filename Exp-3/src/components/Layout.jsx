import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Breadcrumbs from './Breadcrumbs';

export default function Layout() {
  return (
    <div className="layout">
      <Navigation />
      <Breadcrumbs />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; 2025 SPA Routing Demo - Experiment 3 | React Router v6</p>
      </footer>
    </div>
  );
}
