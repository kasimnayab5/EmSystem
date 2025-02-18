// src/services/api.js
import axios from 'axios';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:8080', // Backend URL
});

// Request interceptor: Attach the access token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;

}, (error) => {
  return Promise.reject(error);
});


// Response interceptor: Handle token expiration (401 errors)
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      // If 403 Forbidden, clear tokens and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      window.location.href = '/login';
      return Promise.reject(error);
    }
    // Check if we have a 401 error and the request wasn't already retried
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // Call the refresh endpoint to get a new access token
          const response = await axios.post(`${api.defaults.baseURL}/api/auth/refresh`, {
            refreshToken: refreshToken
          });
          
          const newAccessToken = response.data.accessToken;
          // Update localStorage with the new access token
          localStorage.setItem("token", newAccessToken);
          // Update the Authorization header of the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          
          // Retry the original request with the new token
          return api(originalRequest);
        } catch (refreshError) {
          // If refreshing fails, clear stored tokens and (optionally) redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          // Optionally, you can redirect:
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
