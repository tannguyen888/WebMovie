import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { backendApi } from "./api/axios";
import { useNavigate } from "react-router-dom";

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

const IMG_BASE = import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";
const FALLBACK_POSTER = "/assets/poster.jpg";

const MovieList = ({ title, data }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [genres, setGenres] = useState([]);
  const [hoveredMovie, setHoveredMovie] = useState(null);

  const posters = useMemo(() => {
    return (data || []).reduce((acc, m) => {
      const poster = m?.poster_url || m?.thumb_url;
      const path = m?.poster_path;
      const id = m?._id ?? m?.id;
      acc[id] = poster || (path ? `${IMG_BASE}${path}` : FALLBACK_POSTER);
      return acc;
    }, {});
  }, [data]);

  useEffect(() => {
    // Fetch genres from backend
    backendApi.get("/api/movies/genres")
      .then(res => setGenres(res.data))
      .catch(err => console.error("Error fetching genres:", err));

    // Fetch user favorites
    const token = localStorage.getItem("token");
    if (token) {
      backendApi.get("/api/favorites")
        .then(res => {
          const favSet = new Set(res.data.map(f => f.movieId));
          setFavorites(favSet);
        }).catch(err => console.error("Error fetching favorites:", err));
    }
  }, []);

  const toggleFavorite = async (movie) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add favorites");
      return;
    }
    const isFav = favorites.has(movie.id.toString());
    try {
      if (isFav) {
        await backendApi.delete("/api/favorites", {
          params: { movieId: movie.id }
        });
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(movie.id.toString());
          return newSet;
        });
      } else {
        await backendApi.post("/api/favorites", null, {
          params: {
            movieId: movie.id,
            title: movie.title || movie.name,
            posterPath: movie.poster_path
          }
        });
        setFavorites(prev => new Set(prev).add(movie.id.toString()));
      }
    } catch (err) {
      console.error("Toggle favorite error:", err);
    }
  };

  return (
    <div className="my-10 px-10 max-w-full ">
      <h2 className="text-xl uppercase mb-4">{title}</h2>
      <Carousel responsive={responsive} draggable={false}>
        {data?.map((movie) => {
          const movieId = movie?._id ?? movie?.id;
          const posterUrl = posters[movieId] || FALLBACK_POSTER;
          return (
          <div
            key={movieId}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer group"
            style={{
              backgroundImage: `url(${posterUrl})`,
            }}
            onClick={() => navigate("/movies")}
            onMouseEnter={() => setHoveredMovie(movieId)}
            onMouseLeave={() => setHoveredMovie(null)}
          >
            <button
              className="absolute top-2 right-2 z-20 text-red-500 text-2xl"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite({ ...movie, id: movieId, poster_path: posterUrl });
              }}
            >
              {favorites.has(movieId?.toString()) ? "❤️" : "🤍"}
            </button>

            {/* Genres dropdown on hover */}
            {hoveredMovie === movieId && genres.length > 0 && (
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

            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-center">
                {movie.name || movie.title || movie.origin_name || movie.original_title}
              </h3>
            </div>
          </div>
        );})}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default MovieList;