/**
 * ❤️ Favorite Service - Favorite API calls
 */
import axios from "axios";
import { API_FAVORITES } from "../utils/constants";

/**
 * Get user's favorite movies
 * @returns {Promise} List of favorites
 */
export const getFavorites = async () => {
  try {
    const response = await axios.get(`${API_FAVORITES}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch favorites" };
  }
};

/**
 * Add movie to favorites
 * @param {number} movieId - Movie to add
 * @returns {Promise} Response
 */
export const addFavorite = async (movieId) => {
  try {
    const response = await axios.post(`${API_FAVORITES}`, null, {
      params: { movieId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add favorite" };
  }
};

/**
 * Remove movie from favorites
 * @param {number} movieId - Movie to remove
 * @returns {Promise} Response
 */
export const removeFavorite = async (movieId) => {
  try {
    const response = await axios.delete(`${API_FAVORITES}/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove favorite" };
  }
};
