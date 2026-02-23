import api from './axiosInstance';
import type { IComment, CreateCommentDTO } from '../types';

export const commentService = {
  // Get comments for a task
  getCommentsByTask: async (taskId: string): Promise<IComment[]> => {
    const response = await api.get(`/comments/${taskId}`);
    return Array.isArray(response.data) ? response.data : response.data.data || response.data;
  },

  // Add comment to task
  addComment: async (taskId: string, commentData: CreateCommentDTO): Promise<IComment> => {
    const response = await api.post(`/comments/${taskId}`, commentData);
    return response.data;
  },

  // Delete comment
  deleteComment: async (commentId: string): Promise<void> => {
    await api.delete(`/comments/${commentId}`);
  },
};
