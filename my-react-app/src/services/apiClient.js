import axios from "axios";
import { TOKEN_KEY } from "../utils/constants";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3", // TMDB API
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

const backendApi = axios.create({
  baseURL: "http://localhost:8081", // Backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include token in every request
backendApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !config.url?.includes("/auth/")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add error handling interceptor
backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.error("Authentication error:", error.response.status);
      localStorage.removeItem(TOKEN_KEY);
    }
    return Promise.reject(error);
  }
);

export { api as tmdbApi, backendApi };
export default api;
