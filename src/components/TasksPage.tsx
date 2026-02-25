import React, { useState } from 'react';
import type { ITask } from '../types';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskDetails } from './TaskDetails';
import '../styles/TasksPage.css';

export const TasksPage: React.FC = () => {
  const [view, setView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskSelect = (task: ITask) => {
    setSelectedTask(task);
    setView('details');
  };

  const handleCreateNew = () => {
    setSelectedTask(null);
    setView('form');
  };

  const handleSave = () => {
    setRefreshTrigger((prev) => prev + 1);
    setView('list');
  };

  const handleCancel = () => {
    setView('list');
  };

  const handleEditTask = () => {
    setView('form');
  };

  const handleDeleteTask = () => {
    setRefreshTrigger((prev) => prev + 1);
    setView('list');
  };

  const handleBackToList = () => {
    setView('list');
  };

  return (
    <div className="tasks-page">
      {view === 'list' && (
        <TaskList
          onTaskSelect={handleTaskSelect}
          onCreateNew={handleCreateNew}
          refreshTrigger={refreshTrigger}
        />
      )}
      {view === 'form' && (
        <TaskForm task={selectedTask} onSave={handleSave} onCancel={handleCancel} />
      )}
      {view === 'details' && selectedTask && (
        <TaskDetails
          task={selectedTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onBack={handleBackToList}
          num={1}
        />
      )}
    </div>
  );
};
