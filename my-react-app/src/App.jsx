/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Banner from "./components/layout/Banner";
import MovieList from "./pages/MovieList";
import Favorites from "./pages/Favorites";
import MovieSearch from "./pages/MovieSearch";
import MovieDetail from "./pages/MovieDetail";
import TVShows from "./pages/TVShows";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import "./App.css";

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const hideBannerPaths = ["/login", "/register"];
  const shouldShowBanner = !hideBannerPaths.includes(location.pathname);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Header user={user} setUser={setUser} />
      {shouldShowBanner && <Banner />}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/favorites" element={<Favorites />} />
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
