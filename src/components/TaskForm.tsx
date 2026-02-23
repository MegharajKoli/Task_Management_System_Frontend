import React, { useEffect, useState } from 'react';
import { Status, Priority } from '../types';
import type { ITask, CreateTaskDTO, UpdateTaskDTO, IUser } from '../types';
import { taskService } from '../api/taskService';
import { userService } from '../api/userService';
import '../styles/TaskForm.css';

interface TaskFormProps {
  task?: ITask | null;
  onSave: () => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assigned_to: '' as string,
    priority: Priority.Medium as typeof Priority[keyof typeof Priority],
    status: Status.Open as typeof Status[keyof typeof Status],
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    fetchUsers();
  }, [task]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
      setError('Failed to load users');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (task?._id) {
        // Update existing task
        const updateData: UpdateTaskDTO = {
          title: formData.title,
          description: formData.description,
          assigned_to: formData.assigned_to,
          priority: formData.priority,
          status: formData.status,
        };
        await taskService.updateTask(task._id, updateData);
      } else {
        // Create new task
        const createData: CreateTaskDTO = {
          title: formData.title,
          description: formData.description,
          assigned_to: formData.assigned_to,
          priority: formData.priority,
        };
        await taskService.createTask(createData);
      }
      onSave();
    } catch (err) {
      setError('Failed to save task');
      console.error(err);
    } finally {
      setLoading(false);
    }
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

        {error && <div className="error-message">{error}</div>}

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
                {users.map((user) => (
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
              {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
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
