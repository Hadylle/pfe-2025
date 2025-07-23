import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888',  // Changed from API_BASE_URL to baseURL
  withCredentials: true,
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;