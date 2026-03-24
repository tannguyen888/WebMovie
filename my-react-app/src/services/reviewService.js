/**
 * 📝 ReviewService - Review API calls
 */
import axios from "axios";
import { API_REVIEWS } from "../utils/constants";

/**
 * Get reviews for a movie
 * @param {number} movieId - Movie ID
 * @returns {Promise} List of reviews
 */
export const getMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`${API_REVIEWS}/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch reviews" };
  }
};

/**
 * Create new review
 * @param {number} movieId - Movie ID
 * @param {object} reviewData - {rating, comment}
 * @returns {Promise} Created review
 */
export const createReview = async (movieId, reviewData) => {
  try {
    const response = await axios.post(`${API_REVIEWS}/movie/${movieId}`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to create review" };
  }
};

/**
 * Update review
 * @param {number} reviewId - Review ID
 * @param {object} reviewData - Updated review data
 * @returns {Promise} Updated review
 */
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await axios.put(`${API_REVIEWS}/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update review" };
  }
};

/**
 * Delete review
 * @param {number} reviewId - Review ID
 * @returns {Promise} Response
 */
export const deleteReview = async (reviewId) => {
  try {
    const response = await axios.delete(`${API_REVIEWS}/${reviewId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete review" };
  }
};
