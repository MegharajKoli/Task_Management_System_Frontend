import React, { useEffect, useState } from 'react';
import { Status, Priority } from '../types';
import type { StatusType, PriorityType } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import {  fetchTasks } from '../store/taskSlice';
import '../styles/TaskList.css';
import { useNavigate } from 'react-router-dom';
import { TaskCard } from './modules/Taskcard';


export const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);
  const [filterStatus, setFilterStatus] = useState<StatusType | 'All'>('All');
  const [filterPriority, setFilterPriority] = useState<PriorityType | 'All'>('All');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
 
  const handleTaskSelect = (id: string) => {
    navigate(`/tasks/${id}`);
  }

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  

  if (loading) return <div className="task-list-loading">Loading tasks...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <button className="btn-primary" onClick={() => navigate('/tasks/new')}>
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
            <TaskCard 
              key={task._id} 
              task={task} 
              onSelect={handleTaskSelect} 
            />
          ))
        )}
      </div>
    </div>
  );
};
