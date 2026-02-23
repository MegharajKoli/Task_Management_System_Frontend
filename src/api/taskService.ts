import api from './axiosInstance';
import type { ITask, CreateTaskDTO, UpdateTaskDTO } from '../types';

export const taskService = {
  // Get all tasks
  getTasks: async (): Promise<ITask[]> => {
    const response = await api.get('/tasks');
    return response.data.data || response.data;
  },

  // Get single task
  getTaskById: async (id: string): Promise<ITask> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data.data || response.data;
  },

  // Create task
  createTask: async (taskData: CreateTaskDTO): Promise<ITask> => {
    const response = await api.post('/tasks', taskData);
    return response.data.data || response.data;
  },

  // Update task
  updateTask: async (id: string, taskData: UpdateTaskDTO): Promise<ITask> => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data.data || response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
