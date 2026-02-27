import React, { memo } from 'react';
import { Status, Priority } from '../../types';
import type { ITask, StatusType, PriorityType } from '../../types';

interface TaskCardProps {
  task: ITask;
  onSelect: (id: string) => void;
}

const getPriorityVar = (priority: PriorityType): string => {
  switch (priority) {
    case Priority.High: return 'var(--priority-high)';
    case Priority.Medium: return 'var(--priority-medium)';
    case Priority.Low: return 'var(--priority-low)';
    default: return 'var(--text-main)';
  }
};

const getStatusVar = (status: StatusType): string => {
  switch (status) {
    case Status.Open: return 'var(--status-open-bg)';
    case Status.InProgress: return 'var(--status-progress-bg)';
    case Status.Done: return 'var(--status-done-bg)';
    default: return 'var(--bg-secondary)';
  }
};


const TaskCard: React.FC<TaskCardProps> = memo(({ task, onSelect }) => {
  const priorityColor = getPriorityVar(task.priority);

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
        <span className="status-badge" style={{ backgroundColor: getStatusVar(task.status) }}>
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