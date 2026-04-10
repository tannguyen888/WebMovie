import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

const MovieSearch = ({ results = [], query = "" }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [genres, setGenres] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  useEffect(() => {
    api.get("/genres")
      .then(res => setGenres(res.data))
      .catch(err => console.error("Error fetching genres:", err));

    const token = localStorage.getItem("authToken");
    if (token) {
      api.get("/favorites").then(res => {
        const favSet = new Set(res.data.map(f => f.movieId));
        setFavorites(favSet);
      }).catch(err => console.error(err));
    }
  }, []);

  const toggleFavorite = async (movie) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Vui lòng đăng nhập để thêm yêu thích");
      return;
    }
    const isFav = favorites.has(movie.id.toString());
    try {
      if (isFav) {
        await api.delete("/favorites", {
          params: { movieId: movie.id }
        });
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(movie.id.toString());
          return newSet;
        });
      } else {
        await api.post("/favorites", null, {
          params: {
            movieId: movie.id,
            title: movie.title || movie.name,
            posterPath: movie.posterPath || movie.poster_path,
          }
        });
        setFavorites(prev => new Set(prev).add(movie.id.toString()));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-6">
      <h2 className="text-xl font-bold mb-4 text-white">
        {query ? `Kết quả cho: "${query}"` : "Tìm kiếm phim"}
      </h2>
      {results.length === 0 && <p className="text-gray-400 mt-4">Không có kết quả.</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-cover bg-no-repeat bg-center aspect-[2/3] rounded-lg relative hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer group overflow-hidden"
            style={{
              backgroundImage: item.posterPath
                ? `url(${item.posterPath.startsWith("http") ? item.posterPath : "https://image.tmdb.org/t/p/w500" + item.posterPath})`
                : `url(${(import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500") + (item.poster_path || "")})`,
            }}
            onClick={() => navigate(`/movie/${item.id}`)}
            onMouseEnter={() => setHoveredMovie(item.id)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <button
              className="absolute top-2 right-2 z-20 text-red-500 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item);
              }}
            >
              {favorites.has(item.id.toString()) ? "❤️" : "🤍"}
            </button>

            {/* Genres dropdown on hover */}
            {hoveredMovie === item.id && genres.length > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 text-white p-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-xs font-semibold mb-1">Genres:</div>
                <div className="flex flex-wrap gap-1">
                  {genres.slice(0, 3).map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-blue-600 text-xs px-2 py-1 rounded"
                    >
                      {genre.name}
                    </span>
                  ))}
                  {genres.length > 3 && (
                    <span className="text-xs text-gray-300">+{genres.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            {/* overlay */}
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0" />

            {/* title */}
            <div className="relative p-4 flex items-end justify-center h-full text-center">
              <h3 className="text-sm uppercase font-semibold">
                {item.name || item.title || item.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieSearch.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
};

export default MovieSearch;