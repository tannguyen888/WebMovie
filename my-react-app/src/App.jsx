import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Banner from "./components/layout/Banner";
import MovieList from "./pages/MovieList";
import Favorites from "./pages/Favorites";
import MovieSearch from "./pages/MovieSearch";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <Router>
      <div className="app">
        <Header user={user} setUser={setUser} />
        <Banner />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
