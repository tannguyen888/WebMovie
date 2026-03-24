import { createContext, useState, useEffect } from "react";

/**
 * Auth Context Type
 */
export const AuthContext = createContext({
  user: null,
  tokens: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setTokens(storedToken);
      } catch (error) {
        console.error("Failed to load auth data:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
      }
    }

    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    setUser(userData);
    setTokens(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    tokens,
    loading,
    login,
    logout,
    isAuthenticated: !!tokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
