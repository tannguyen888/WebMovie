import "./App.css";
import Banner from "./Banner";
import Header from "./Header";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // <- import này
// bạn cần tạo component Home.jsx
import Register from "./Register"; // component Register.jsx
import Login from "./login"; // component Login.jsx
import Favorites from "./Favorites";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    if (!value) return setSearchData([]);

    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&language=vi&page=1`;

    try {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      const data = await res.json();
      setSearchData(data.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      try {
        const [trending, topRated] = await Promise.all([
          fetch("https://api.themoviedb.org/3/trending/movie/day?language=vi", options),
          fetch("https://api.themoviedb.org/3/movie/top_rated?language=vi", options),
        ]);

        const trendingData = await trending.json();
        const topRatedData = await topRated.json();

        setTrendingMovies(trendingData.results);
        setTopRatedMovies(topRatedData.results);
      } catch (error) {
        console.error(error);
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
        <Route path="/movies" element={<MovieList title="Movies" data={trendingMovies} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
