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
  }, []);

  const addFavorite = useCallback(async (movieId) => {
    // TODO:
    // 1. Call favoriteService.addFavorite()
    // 2. Update local favorites state
    // 3. Handle optimistic updates
  }, []);

  const removeFavorite = useCallback(async (movieId) => {
    // TODO:
    // 1. Call favoriteService.removeFavorite()
    // 2. Update local favorites state
  }, []);

  return {
    favorites,
    loading,
    getFavorites,
    addFavorite,
    removeFavorite,
  };
}
