export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {currentYear} CU AIML - Experiment 1</p>
        <p>
          Built with React | Deployed with Git
        </p>
        <div className="social-links">
          <a href="https://github.com">GitHub</a>
          <a href="https://linkedin.com">LinkedIn</a>
          <a href="https://react.dev">React Docs</a>
        </div>
      </div>
    </footer>
  );
}