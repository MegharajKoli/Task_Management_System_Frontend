import { Link } from 'react-router-dom';
import '../styles/Home.css';

export function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Task Management System</h1>
          <p>Organize, track, and manage your tasks efficiently</p>
          <div className="hero-buttons">
            <Link to="/tasks" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Task Management</h3>
            <p>Create, update, and organize your tasks with ease.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>User Management</h3>
            <p>Assign tasks to users .</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard Analytics</h3>
            <p>Get insights of All  The Tasks Listed.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Comments </h3>
            <p>Add Comment on Tasks To Keep Track.</p>
          </div>
        </div>
      </section>

      <section className="quick-links-section">
        <h2>Quick Access</h2>
        <div className="quick-links">
          <Link to="/tasks" className="quick-link-card">
            <h3>Tasks</h3>
            <p>View and manage all your tasks</p>
          </Link>
          <Link to="/users" className="quick-link-card">
            <h3>Users</h3>
            <p>Manage All Users</p>
          </Link>
          <Link to="/dashboard" className="quick-link-card">
            <h3>Dashboard</h3>
            <p>View analytics and reports</p>
          </Link>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Start managing your tasks today</p>
        <Link to="/tasks" className="btn btn-primary btn-large">
          Go to Tasks
        </Link>
      </section>
    </div>
  );
}

export default Home;
