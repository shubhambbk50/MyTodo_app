import axios from 'axios';

// Base URL for your backend API
const API_URL = import.meta.env.VITE_API_URL || 'https://mytodo-app-backend-zb52.onrender.com/api/v1';

// Function for user login
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });

    console.log("response , ",response)

    // If login is successful, return the token
    if (response.data.success) {
      return { success: true, userId: response.data.data.user._id, token: response.data.data.accessToken };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Login Error: ', error);
    return { success: false, message: 'Login failed. Please try again later.' };
  }
};

// Function for user signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Store tokens in localStorage if needed
    if (response.data.statusCode === 200) {
      localStorage.setItem('accessToken', response.data.data.accessToken);
      localStorage.setItem('refreshToken', response.data.data.refreshToken);
    }
    
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to logout (clear token from localStorage)
export const logout = () => {
  localStorage.removeItem('authToken'); // Remove the token from localStorage
};

// Function to get the auth token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to check if the user is logged in (check if token exists)
export const isLoggedIn = () => {
  return !!getAuthToken(); // Returns true if token exists, else false
};

// Function to add token to headers for authenticated API requests
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {}; // Return token in headers if exists
};
