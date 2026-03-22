import "./App.css";
import Banner from "./Banner";
import Header from "./Header";
import MovieList from "./MovieList";
import MoviewDisplay from "./MoviewDisplay";
import MoviePlayer from "./MoviePlayer";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./login";
import Favorites from "../Favorites";
const API_BASE = "http://localhost:8080/api";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    if (!value) return setSearchData([]);

    const url = `${API_BASE}/search?q=${encodeURIComponent(value)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const movies = data?.content?.movies || [];
      const tv = data?.content?.tv || [];
      setSearchData([...movies, ...tv]);
    } catch (err) {
      console.error("Search error", err);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingRes, seriesRes] = await Promise.all([
          fetch(`${API_BASE}/movies/popular`),
          fetch(`${API_BASE}/tv/popular`),
        ]);

        const trendingData = await trendingRes.json();
        const seriesData = await seriesRes.json();

        setTrendingMovies(trendingData?.content?.movies || []);
        setTopRatedMovies(seriesData?.content?.tv || []);
      } catch (error) {
        console.error("Fetch movies error", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <Header onSearch={handleSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              {searchData.length > 0 ? (
                <MovieList title="Kết quả tìm kiếm" data={searchData} />
              ) : (
                <>
                  <MovieList title="Trending" data={trendingMovies} />
                  <MovieList title="Top Rated" data={topRatedMovies} />
                </>
              )}
            </>
          }
        />
        <Route path="/movies" element={<MoviewDisplay />} />
        <Route path="/movie/:id" element={<MoviePlayer />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
