import { Link } from 'react-router-dom';

interface NavbarProps {
  theme: 'light' | 'dark'; 
  onThemeToggle: () => void;
}

const Navbar = ({ theme, onThemeToggle } : NavbarProps) => (
  <nav className="navbar">
    <div className="navbar-brand">
      <Link to="/">
        <h1>Task Management System</h1>
      </Link>
    </div>
    <ul className="nav-links">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/tasks">Tasks</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
    </ul>
    <button 
      className="theme-toggle-btn" 
      onClick={onThemeToggle} 
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  </nav>
);

export default Navbar;