import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
let authFailureHandler = null;

export const apiClient = axios.create({
  baseURL,
  timeout: 8000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      if (authFailureHandler) {
        authFailureHandler();
      }
    }
    return Promise.reject(error);
  },
);

export function setAuthFailureHandler(handler) {
  authFailureHandler = typeof handler === 'function' ? handler : null;
}
