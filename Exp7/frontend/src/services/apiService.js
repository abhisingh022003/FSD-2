import { apiClient } from './apiClient';

class ApiService {
  async register(payload) {
    const response = await apiClient.post('/auth/register', payload);
    return response.data;
  }

  async login(payload) {
    const response = await apiClient.post('/auth/login', payload);
    return response.data;
  }

  async getProfile() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  }

  async getTasks(params = {}) {
    const response = await apiClient.get('/tasks', { params });
    return response.data.tasks;
  }

  async createTask(payload) {
    const response = await apiClient.post('/tasks', payload);
    return response.data.task;
  }

  async updateTask(id, payload) {
    const response = await apiClient.put(`/tasks/${id}`, payload);
    return response.data.task;
  }

  async patchTask(id, payload) {
    const response = await apiClient.patch(`/tasks/${id}`, payload);
    return response.data.task;
  }

  async deleteTask(id) {
    await apiClient.delete(`/tasks/${id}`);
  }
}

export const apiService = new ApiService();
