import React, { useEffect, useState } from 'react';
import type { CreateUserDTO } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers, createUser } from '../store/userSlice';
import '../styles/UserManagement.css';

export const UserManagement: React.FC = () => {

  const dispatch = useAppDispatch();
  const { users, loading, error, submitting } = useAppSelector(state => state.users);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // fetchUsers handled by Redux thunk

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser(formData as CreateUserDTO)).then(() => {
      setFormData({
        name: '',
        email: '',
        contact: '',
        password: '',
      });
      setShowForm(false);
    });
  };

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h2>Users</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New User'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="user-form-card">
          <h3>Create New User</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter user name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact">Contact *</label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Creating...' : 'Create User'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <div className="users-grid">
          {users.length === 0 ? (
            <p className="no-users">No users found</p>
          ) : (
            users.map((user) => (
              <div key={user._id} className="user-card">
                <h3>{user.name}</h3>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Contact:</strong> {user.contact}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
