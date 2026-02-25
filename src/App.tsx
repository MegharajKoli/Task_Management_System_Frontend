
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TasksPage, UserManagement, Dashboard, Home } from './components';
import { useAppDispatch, useAppSelector } from './store';
import { toggleTheme } from './store/themeSlices';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);

  // Update DOM when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" >
              <h1>Task Management System</h1>
            </Link>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <button className="theme-toggle-btn" onClick={handleThemeToggle} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2026 Task Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

