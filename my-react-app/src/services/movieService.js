/**
 * 🎬 Movie Service - Movie API calls
 */
import axios from "axios";
import { API_MOVIES } from "../utils/constants";

/**
 * Get all movies with pagination
 * @param {number} page - Page number
 * @param {number} size - Items per page
 * @returns {Promise} Movies list
 */
export const getMovies = async (page = 0, size = 20) => {
  try {
    const response = await axios.get(`${API_MOVIES}?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch movies" };
  }
};

/**
 * Get movie by ID
 * @param {number} id - Movie ID
 * @returns {Promise} Movie details
 */
export const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API_MOVIES}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Movie not found" };
  }
};

/**
 * Search movies
 * @param {string} keyword - Search keyword
 * @returns {Promise} Search results
 */
export const searchMovies = async (keyword) => {
  try {
    const response = await axios.get(`${API_MOVIES}/search?q=${keyword}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Search failed" };
  }
};

/**
 * Filter movies by genre
 * @param {string} genre - Genre name
 * @returns {Promise} Movies in genre
 */
export const getMoviesByGenre = async (genre) => {
  try {
    const response = await axios.get(`${API_MOVIES}?genre=${genre}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch movies" };
  }
};
