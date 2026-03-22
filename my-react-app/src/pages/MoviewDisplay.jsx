import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";
const FALLBACK_POSTER = "https://via.placeholder.com/300x450";

export default function MoviewDisplay() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("movie");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const endpoint = type === "movie" ? "/movies/popular" : "/tv/popular";
        const res = await fetch(`${API_BASE}${endpoint}`);
        const data = await res.json();
        const items = type === "movie" ? (data?.content?.movies || []) : (data?.content?.tv || []);
        setMovies(items);
        setFilteredMovies(items);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [type]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!search) {
        setFilteredMovies(movies);
      } else {
        const filtered = movies.filter((m) => (m.title || m.name || "").toLowerCase().includes(search.toLowerCase()));
        setFilteredMovies(filtered);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, movies]);

  const posterUrl = (movie) => movie?.posterPath || movie?.poster_url || movie?.thumb_url || FALLBACK_POSTER;
  const movieId = (movie) => movie?.id;
  const handleMovieClick = (movie) => navigate(`/movie/${movieId(movie)}`);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Danh Sách Phim</h1>
      <div className="mb-6 flex gap-4 flex-wrap">
        <select value={type} onChange={(e) => setType(e.target.value)} className="px-4 py-2 bg-gray-800 rounded text-white border border-gray-700">
          <option value="movie">Phim Lẻ</option>
          <option value="tv">Phim Bộ</option>
        </select>
        <input type="text" placeholder="Tìm kiếm..." value={search} onChange={(e) => setSearch(e.target.value)} className="px-4 py-2 bg-gray-800 rounded text-white flex-1 max-w-md border border-gray-700 focus:outline-none" />
      </div>
      {loading && <p className="text-center text-lg">Đang tải...</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMovies.map((movie) => (
          <div key={movieId(movie)} onClick={() => handleMovieClick(movie)} className="bg-gray-800 rounded overflow-hidden group cursor-pointer hover:scale-105 transition shadow-lg">
            <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-700">
              <img src={posterUrl(movie)} alt={movie.title || movie.name} loading="lazy" className="w-full h-full object-cover group-hover:brightness-75" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold">Xem Phim</button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-semibold truncate text-sm">{movie.title || movie.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{movie.releaseYear || movie.year || ""}</p>
              <p className="text-xs text-yellow-500 mt-1">⭐ {movie.rating || 0}/100</p>
            </div>
          </div>
        ))}
      </div>
      {!loading && filteredMovies.length === 0 && <p className="text-center text-gray-400 mt-10">Không tìm thấy phim</p>}
    </div>
  );
}
