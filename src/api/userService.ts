import api from './axiosInstance';
import type { IUser, CreateUserDTO } from '../types';

export const userService = {
  // Get all users
  getUsers: async (): Promise<IUser[]> => {
    const response = await api.get('/users');
    return Array.isArray(response.data) ? response.data : response.data.data || response.data;
  },

  // Get single user
  getUserById: async (id: string): Promise<IUser> => {
    const response = await api.get(`/users/${id}`);
    return Array.isArray(response.data) ? response.data[0] : response.data.data || response.data;
  },

  // Create user
  createUser: async (userData: CreateUserDTO): Promise<IUser> => {
    const response = await api.post('/users', userData);
    return response.data;
  },
};
