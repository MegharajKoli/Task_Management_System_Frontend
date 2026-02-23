
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { TasksPage, UserManagement, Dashboard } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>Task Management System</h1>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<TasksPage />} />
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
