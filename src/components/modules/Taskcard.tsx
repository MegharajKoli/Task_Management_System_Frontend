import React, { memo } from 'react';
import { Status, Priority } from '../../types';
import type { ITask, StatusType, PriorityType } from '../../types';

interface TaskCardProps {
  task: ITask;
  onSelect: (id: string) => void;
}

const getPriorityColor = (priority: PriorityType): string => {
  switch (priority) {
    case Priority.High: return '#d32f2f';
    case Priority.Medium: return '#f57c00';
    case Priority.Low: return '#388e3c';
    default: return '#666';
  }
};

const getStatusBg = (status: StatusType): string => {
  switch (status) {
    case Status.Open: return '#e3f2fd';
    case Status.InProgress: return '#fff3e0';
    case Status.Done: return '#e8f5e9';
    default: return '#f5f5f5';
  }
};

const TaskCard: React.FC<TaskCardProps> = memo(({ task, onSelect }) => {
  const priorityColor = getPriorityColor(task.priority);

  return (
    <div
      className="task-card"
      onClick={() => onSelect(task._id)}
      style={{ borderLeftColor: priorityColor }}
    >
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className="priority-badge" style={{ color: priorityColor }}>
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
  );
});

export default memo(TaskCard);