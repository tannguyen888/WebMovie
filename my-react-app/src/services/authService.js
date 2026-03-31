/**
 * 🔐 Auth Service - Authentication API calls
 */
import axios from "axios";
import { API_AUTH } from "../utils/constants";

/**
 * Login with username and password
 * @param {string} username - User's username
 * @param {string} password - User's password
 * @returns {Promise} Login response with token
 */
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_AUTH}/login`, {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

/**
 * Register new user
 * @param {string} username - Choose username
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Registration response
 */
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_AUTH}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const registerWithGoogle = async (googleToken) => {
   try {
     const response = await axios.post(`${API_AUTH}/register/google`, {
       token: googleToken,
     });  
     if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      }
     return response.data;
   } catch (error) {
     throw error.response?.data || { message: "Google registration failed" };
   }
}

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");
};

/**
 * Get current user from localStorage
 * @returns {object} Current user object
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("authToken");
};
