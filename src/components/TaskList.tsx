import React, { useEffect, useState } from 'react';
import { Status, Priority } from '../types';
import type { ITask, StatusType, PriorityType } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchTasks } from '../store/taskSlice';
import '../styles/TaskList.css';

interface TaskListProps {
  onTaskSelect: (task: ITask) => void;
  onCreateNew: () => void;
  refreshTrigger?: number;
}

export const TaskList: React.FC<TaskListProps> = ({ onTaskSelect, onCreateNew, refreshTrigger }) => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);
  const [filterStatus, setFilterStatus] = useState<StatusType | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<PriorityType | 'All'>('All');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, refreshTrigger]);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: PriorityType): string => {
    switch (priority) {
      case Priority.High:
        return '#d32f2f';
      case Priority.Medium:
        return '#f57c00';
      case Priority.Low:
        return '#388e3c';
      default:
        return '#666';
    }
  };

  const getStatusBg = (status: StatusType): string => {
    switch (status) {
      case Status.Open:
        return '#e3f2fd';
      case Status.InProgress:
        return '#fff3e0';
      case Status.Done:
        return '#e8f5e9';
      default:
        return '#f5f5f5';
    }
  };

  if (loading) return <div className="task-list-loading">Loading tasks...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <button className="btn-primary" onClick={onCreateNew}>
          + New Task
        </button>
      </div>

      <div className="task-list-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as StatusType | 'All')}>
            <option value="All">All</option>
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value as PriorityType | 'All')}>
            <option value="All">All</option>
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-secondary" onClick={() => dispatch(fetchTasks())}>
          Refresh
        </button>
      </div>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="no-tasks">No tasks found</div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="task-card"
              onClick={() => onTaskSelect(task)}
              style={{ borderLeftColor: getPriorityColor(task.priority) }}
            >
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="priority-badge" style={{ color: getPriorityColor(task.priority) }}>
                  {task.priority}
                </span>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="status-badge" style={{ backgroundColor: getStatusBg(task.status) }}>
                  {task.status}
                </span>
                <span className="assigned-badge">
                  Assigned to: {typeof task.assigned_to === 'string' ? task.assigned_to : task.assigned_to?.name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
