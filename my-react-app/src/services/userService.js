/**
 * 👤 UserService - User API calls
 */
import api from "../config/axios";

/**
 * Get current user profile
 * @returns {Promise} User data
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

/**
 * Update user profile
 * @param {object} userData - User data to update
 * @returns {Promise} Updated user
 */
export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/users/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};

/**
 * Change password
 * @param {string} oldPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise} Response
 */
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await api.post("/users/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to change password" };
  }
};
