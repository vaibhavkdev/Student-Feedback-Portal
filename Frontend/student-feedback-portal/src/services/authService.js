import api from '../api/axios';

/**
 * Sends login credentials to the backend and returns JWT token + role
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} - Returns { token, role }
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('http://localhost:5062/api/login', { email, password });
    // Expected response: { token: '...', role: 'Student' | 'Admin' | 'Faculty' }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed. Try again.' };
  }
};

/**
 * Registers a new user
 * @param {Object} userData - { name, email, password, role }
 * @returns {Promise<Object>} - Returns a success message or token
 */
export const registerUser = async (userData) => {
  try {
    const response = await api.post('http://localhost:5062/api/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed. Try again.' };
  }
};
