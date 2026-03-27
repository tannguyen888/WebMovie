import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FALLBACK_POSTER = "/assets/poster.jpg";
const IMG_BASE = import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Vui lòng đăng nhập để xem danh sách yêu thích.");
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(res.data || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Không tải được danh sách yêu thích.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = async (movieId) => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      await axios.delete("http://localhost:8080/api/favorites", {
        params: { movieId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((f) => f.movieId !== movieId));
    } catch (err) {
      console.error("Error removing favorite:", err);
      alert("Không xoá được phim yêu thích.");
    }
  };

  if (loading) {
    return <div className="p-10 text-white">Đang tải danh sách...</div>;
  }

  if (error) {
    return <div className="p-10 text-white">{error}</div>;
  }

  if (!favorites.length) {
    return <div className="p-10 text-white">Bạn chưa lưu phim nào.</div>;
  }

  const getPosterUrl = (path) => {
    if (!path) return FALLBACK_POSTER;
    return path.startsWith("http") ? path : `${IMG_BASE}${path}`;
  };

  return (
    <div className="px-6">
      <h2 className="text-2xl font-bold mb-6 text-white">My Favorites</h2>
      <div className="flex flex-wrap gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.id || fav.movieId}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${getPosterUrl(fav.posterPath)})`,
            }}
            onClick={() => navigate(`/movie/${fav.movieId}`)}
          >
            <button
              className="absolute top-2 right-2 z-10 text-red-500 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                removeFavorite(fav.movieId);
              }}
            >
              ❤️
            </button>
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0" />
            <div className="relative p-4 flex items-end justify-center h-full text-center">
              <h3 className="text-sm uppercase font-semibold text-white">
                {fav.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;