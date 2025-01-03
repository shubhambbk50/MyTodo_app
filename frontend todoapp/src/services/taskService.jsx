import axios from 'axios';
import { getAuthHeaders } from './authService';  // Import the function that returns the auth token in headers

// Use Vite's environment variable system
const API_URL = 'https://mytodo-app-backend-j4pf.onrender.com/api/v1';

// Add Task API call
export const addTask = async (formData) => {
  return axios.post(`${API_URL}/tasks`, formData, {
    headers: getAuthHeaders()  // Attach the token to the request
  });
};

// Get Tasks API call
export const getTasks = async () => {
  const userId = localStorage.getItem('userId');
  return axios.get(`${API_URL}/getTodos/byUserId/${userId}`, {
    headers: getAuthHeaders()  // Attach the token to the request
  });
};
