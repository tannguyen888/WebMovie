import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TrendingTabs from "../components/home/TrendingTabs";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const FALLBACK_POSTER = "/assets/poster.jpg";

const MovieList = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/api/movies");
        const list = Array.isArray(response.data)
          ? response.data
          : response.data?.content?.movies || response.data?.content || [];
        setMovies(list);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await axios.get("http://localhost:8080/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favSet = new Set(res.data.map((f) => f.movieId?.toString()));
        setFavorites(favSet);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchMovies();
    fetchFavorites();
  }, []);

  const toggleFavorite = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add favorites");
      return;
    }

    const movieId = movie.id?.toString();
    const isFav = favorites.has(movieId);

    try {
      if (isFav) {
        await axios.delete("http://localhost:8080/api/favorites", {
          params: { movieId: movie.id },
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(movieId);
          return next;
        });
      } else {
        await axios.post("http://localhost:8080/api/favorites", null, {
          params: {
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.posterPath,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites((prev) => new Set(prev).add(movieId));
      }
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };

  if (loading) return <div className="p-10 text-white">Loading movies...</div>;
  if (error) return <div className="p-10 text-white text-red-500">{error}</div>;
  if (!movies.length) return <div className="p-10 text-white">No movies found</div>;

  return (
    <div className="my-10 px-10 max-w-full space-y-14">
      <section>
        <h2 className="text-2xl text-white uppercase mb-4 font-bold">Popular Movies</h2>
        <Carousel responsive={responsive} draggable={false}>
          {movies.map((movie) => {
            const movieId = movie?.id;
            return (
              <div
                key={movieId}
                className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer group mx-2"
                style={{
                  backgroundImage: `url(${movie.posterPath || FALLBACK_POSTER})`,
                }}
                onClick={() => navigate(`/movie/${movieId}`)}
                onMouseEnter={() => setHoveredMovie(movieId)}
                onMouseLeave={() => setHoveredMovie(null)}
              >
                <button
                  className="absolute top-2 right-2 z-20 text-2xl hover:scale-125 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(movie);
                  }}
                >
                  {favorites.has(movieId?.toString()) ? "❤️" : "🤍"}
                </button>

                {hoveredMovie === movieId && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-90 text-white p-3 z-10">
                    <div className="text-sm font-semibold mb-1">{movie.title}</div>
                    <div className="text-xs text-gray-300">{movie.genre}</div>
                  </div>
                )}

                <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
              </div>
            );
          })}
        </Carousel>
      </section>

      <TrendingTabs />
    </div>
  );
};

export default MovieList;