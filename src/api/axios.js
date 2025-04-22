import axios from 'axios';
import { refreshAccessToken } from './auth';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: false,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        return axiosInstance(originalRequest);
      } else {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
