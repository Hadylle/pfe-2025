import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8888/api',
  withCredentials: true,
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const userSub = localStorage.getItem('userSub');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
    if (userSub) {
    config.headers['X-User-Sub'] = userSub;
  }
  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;