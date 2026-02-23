import api from './axiosInstance';
import type { TaskReport } from '../types';

export const reportService = {
  // Get task report
  getTaskReport: async (): Promise<TaskReport> => {
    const response = await api.get('/reports/tasks');
    return response.data;
  },
};
