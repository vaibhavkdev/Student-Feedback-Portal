import axios from 'axios';

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: 'http://localhost:5062/api', // Update this if your backend URL changes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token from localStorage to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
