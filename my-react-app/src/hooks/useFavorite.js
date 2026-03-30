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
    // TODO:
    // 1. Call favoriteService.getFavorites()
    // 2. Update favorites state
    // 3. Handle loading state
     try {
      favoriteService.getFavorites().then((data) => {
        setFavorites(data || []);
      });
      setLoading(false);
     } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(true);
     }

  }, []);

  const addFavorite = useCallback(async (movieId) => {
    // TODO:
    // 1. Call favoriteService.addFavorite()
    // 2. Update local favorites state
    // 3. Handle optimistic updates
    try {

      favoriteService.getFavorites().then((data) => {
        setFavorites(data|| []);
      });
        setFavorites((prev) => [...prev, { id: movieId }]);
   
     
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  }, []);

  const updateFavorites = useCallback(async (movieId) => {
    try {
      favoriteService.updateFavorites(movieId).then((data) => {
        setFavorites(data || []);
      });
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  }, []);

  const removeFavorite = useCallback(async (movieId) => {
    // TODO:
    // 1. Call favoriteService.removeFavorite()
    // 2. Update local favorites state
    // 3. Handle optimistic updates
    try {
      await favoriteService.removeFavorite(movieId);
        setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
      
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
