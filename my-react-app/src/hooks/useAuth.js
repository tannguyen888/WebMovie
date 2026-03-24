/**
 * 🔐 useAuth Hook - Authentication logic
 */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Custom hook for authentication
 * @returns {object} Auth state and methods
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
