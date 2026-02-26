import React, { useEffect, useState } from 'react';
import { Status, Priority } from '../../types';
import type { ITask } from '../../types';
import {  useAppSelector, useAppDispatch } from '../../store';
import '../../styles/TaskForm.css';
import { fetchUsers } from '../../store/userSlice';

interface TaskFormProps {
  task?: ITask | null;
  onSubmit: (data: any) => void; 
  onCancel: () => void;
  submitting: boolean;
  loading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel, submitting ,loading }) => {
    const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assigned_to: typeof task?.assigned_to === 'string' ? task.assigned_to : (task?.assigned_to as any)?.email || '',
    priority: task?.priority || Priority.Medium,
    status: task?.status || Status.Open,
  });

  const { users: userList } = useAppSelector(state => state.users);

   useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        assigned_to: typeof task.assigned_to === 'string' ? task.assigned_to : task.assigned_to.email || '',
        priority: task.priority as typeof Priority[keyof typeof Priority],
        status: task.status as typeof Status[keyof typeof Status],
      });
    }
    dispatch(fetchUsers());
  }, [task, dispatch]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
    onSubmit(formData); 
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="task-form-container">
      <div className="task-form-card">
        <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>


        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter task description"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assigned_to">Assigned To *</label>
              <select
                id="assigned_to"
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                required
              >
                <option value="">Select a user</option>
                {userList.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
                {Object.values(Priority).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {task && (
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange}>
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={loading}>
              {submitting ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
            <button type="button" className="btn-secondary" onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
