/**
 * ❤️ useFavorite Hook
 * Favorite management
 */
import { useState, useCallback } from "react";
import * as favoriteService from "../services/favoriteService";

export function useFavorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await favoriteService.getFavorites();
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavorite = useCallback(async (movieId) => {
    try {
      await favoriteService.addFavorite(movieId);
      const data = await favoriteService.getFavorites();
      setFavorites(data || []);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }, []);

  const updateFavorites = useCallback(async (movieId) => {
    try {
      await favoriteService.updateFavorites(movieId);
      const data = await favoriteService.getFavorites();
      setFavorites(data || []);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  }, []);

  const removeFavorite = useCallback(async (movieId) => {
    try {
      await favoriteService.removeFavorite(movieId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== movieId && fav.movieId !== movieId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  }, []);

  return {
    favorites,
    loading,
    getFavorites,
    addFavorite,
    removeFavorite,
    updateFavorites,
  };
}
