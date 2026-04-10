/**
 * ❤️ Favorite Service - Favorite API calls
 */
import api from "../config/axios";

/**
 * Get user's favorite movies
 * @returns {Promise} List of favorites
 */
export const getFavorites = async () => {
  try {
    const response = await api.get("/favorites");
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
    const response = await api.post("/favorites", null, {
      params: { movieId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add favorite" };
  }
};

/**
 * Update movie in favorites
 * @param {number} movieId - Movie to update
 * @returns {Promise} Response
 */
export const updateFavorites = async (movieId) => {
  try {
    const response = await api.post("/favorites", null, {
      params: { movieId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update favorite" };
  }
};

/**
 * Remove movie from favorites
 * @param {number} movieId - Movie to remove
 * @returns {Promise} Response
 */
export const removeFavorite = async (movieId) => {
  try {
    const response = await api.delete(`/favorites/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove favorite" };
  }
};
