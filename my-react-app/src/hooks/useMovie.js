/**
 * 📚 useMovie Hook
 * Movie data and operations
 */
import { useState, useCallback } from "react";
import * as movieService from "../services/movieService";

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (page = 0, size = 20) => {
    // TODO:
    // 1. Call movieService.getMovies()
    // 2. Handle loading state
    // 3. Handle error state
    // 4. Update movies state
    try {
      setLoading(true);
      movieService.getMovies(page, size).then((data) => {
        setMovies(data || []);
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (keyword) => {
    // TODO:
    // 1. Call movieService.searchMovies()
    // 2. Update movies state with results
    // 3. Handle errors

    try{
      setLoading(true);
      movieService.searchMovies(keyword).then((data) => {
        setMovies(data || []);
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    }
    finally {
      setLoading(false);
    }
  }, []);

  return {
    movies,
    loading,
    error,
    fetchMovies,
    searchMovies,
  };
}
