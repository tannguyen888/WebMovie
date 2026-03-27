/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useSearchParams,
  Navigate,
} from "react-router-dom";

import Header from "./components/layout/Header";
import Banner from "./components/layout/Banner";
import MovieList from "./pages/MovieList";
import Favorites from "./pages/Favorites";
import MovieDetail from "./pages/MovieDetail";
import TVShows from "./pages/TVShows";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import MovieSearch from "./pages/MovieSearch";

import { AuthContext } from "./context/AuthContext";


function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();


  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);

  const hideBannerPaths = ["/login", "/register", "/search"];
  const shouldShowBanner = !hideBannerPaths.includes(location.pathname);

  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchSearch = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        // Backend trả: { success, content: { movies: [...], tv: [...] } }
        const movies = data?.content?.movies || data?.content?.tv || [];
        setResults(movies);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    fetchSearch();
  }, [query]);

 
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
    
      <Header />

      {shouldShowBanner && <Banner />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movie/:id" element={<MovieDetail />} />

       
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

        
          <Route
            path="/search"
            element={<MovieSearch results={results} query={query} />}
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

