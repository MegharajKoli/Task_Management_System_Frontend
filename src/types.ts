// Priority - keep as object for runtime values
export const Priority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
} as const;

// Extract type from Priority object
export type PriorityType = (typeof Priority)[keyof typeof Priority];

// Status - keep as object for runtime values  
export const Status = {
  Open: 'Open',
  InProgress: 'In Progress',
  Done: 'Done',
} as const;

// Extract type from Status object
export type StatusType = (typeof Status)[keyof typeof Status];

// User Interface
export interface IUser {
  _id: string;
  name: string;
  email: string;
  contact: string;
}

// Task Interface
export interface ITask {
  _id: string;
  title: string;
  description: string;
  assigned_to: IUser | string;
  priority: PriorityType;
  status: StatusType;
  createdAt: string;
}

// Comment Interface
export interface IComment {
  _id: string;
  content: string;
  task_id: string;
  createdAt: string;
}

// Activity Log Interface
export interface IActivityLog {
  _id: string;
  action: string;
  details: string;
  taskId: string;
  userId: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Task Report Interface
export interface TaskReport {
  totalTasks: number;
  tasksByStatus: {
    [key in StatusType]: number;
  };
  tasksByPriority: {
    [key in PriorityType]: number;
  };
  tasksByUser: {
    userId: string;
    userName: string;
    taskCount: number;
  }[];
}

// Create/Update DTOs
export interface CreateTaskDTO {
  title: string;
  description: string;
  assigned_to: string;
  priority: PriorityType;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  assigned_to?: string;
  priority?: PriorityType;
  status?: StatusType;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  contact: string;
  password: string;
}

export interface CreateCommentDTO {
  content: string;
}
