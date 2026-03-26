/**
 * 🎭 MovieCard Component
 * Display movie card in grid/list with API data
 */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as movieService from "../../services/movieService";
import "./MovieCard.css";

export function MovieCard({ movie, onSelect, onFavorite, isFavorited }) {
  const [movieData, setMovieData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movie data and episodes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch movie details
        const data = await movieService.getMovieById(movie.id);
        setMovieData(data);
        
        // Fetch episodes
        const episodesData = await movieService.getMovieEpisodes(movie.id);
        setEpisodes(episodesData || []);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (movie.id) {
      fetchData();
    }
  }, [movie.id]);

  // Extract data from API with fallbacks
  const title = movieData?.title || movie?.title || "Unknown Title";
  const description = movieData?.description || "No description available";
  const genres = movieData?.genres || [];
  const rating = movieData?.rating || 0;
  const episodeCount = episodes.length;
  const director = movieData?.director || "Unknown Director";

  // Handle loading state
  if (loading) {
    return (
      <div className="movie-card">
        <div className="card shadow-[0px_4px_16px_px_#367E08] h-[400px] w-[280px] rounded-[1.5em] p-[1.5em] flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card">
      <div
        className="card shadow-[0px_4px_16px_px_#367E08] h-[400px] w-[280px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden cursor-pointer"
        onClick={() => onSelect?.(movie.id)}
      >
        {/* Background */}
        <div className="absolute top-0 left-0 h-full w-full bg-[#111111]" />

        {/* Content */}
        <div className="container text-white z-[2] relative font-nunito flex flex-col gap-[0.5em]">
          {/* Title & Director */}
          <div className="h-fit w-full">
            <h1
              className="card_heading text-[1.5em] tracking-[.2em]"
              style={{
                fontWeight: 900,
                WebkitTextFillColor: "transparent",
                WebkitTextStrokeWidth: 1,
                textShadow: "0 0 7px #fff",
              }}
            >
              {title}
            </h1>
            <p
              className="text-[1.2em]"
              style={{
                fontWeight: 900,
                WebkitTextFillColor: "transparent",
                WebkitTextStrokeWidth: 1,
                textShadow: "0 0 7px #fff",
              }}
            >
              By {director}
            </p>
          </div>

          {/* Rating & Stars */}
          <div className="flex justify-left items-center h-fit w-full gap-[1.5em]">
            <div className="w-fit h-fit flex justify-left gap-[0.5em]">
              {/* Render star icons based on rating */}
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 576 512"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[1em] w-[1em]"
                  fill={i < Math.floor(rating) ? "white" : "#666"}
                >
                  <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                </svg>
              ))}
            </div>
            <div className="w-fit h-fit text-white font-nunito text-[1.2em] font-light">
              <p>{rating.toFixed(1)}/5 stars</p>
            </div>
          </div>

          {/* Genres Tags */}
          <div className="flex justify-center items-center h-fit w-fit gap-[0.5em] flex-wrap">
            {genres.length > 0 ? (
              genres.slice(0, 3).map((genre) => (
                <div
                  key={genre}
                  className="border-2 border-white rounded-[0.5em] text-white font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300"
                >
                  <p>{genre}</p>
                </div>
              ))
            ) : (
              <div className="text-white text-[0.9em]">No genres</div>
            )}
            {episodeCount > 0 && (
              <div className="border-2 border-yellow-400 rounded-[0.5em] text-yellow-400 font-nunito text-[1em] font-normal px-[0.5em] py-[0.05em]">
                <p>{episodeCount} eps</p>
              </div>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(movie.id);
            }}
            className={`mt-2 px-3 py-1 rounded text-[0.9em] font-nunito font-normal transition-colors ${
              isFavorited
                ? "bg-red-500 text-white"
                : "border-2 border-white text-white hover:bg-white hover:text-[#222222]"
            }`}
          >
            {isFavorited ? "❤️ Favorited" : "🤍 Add"}
          </button>
        </div>

        {/* Description - Shows on hover */}
        <p className="font-nunito block text-white font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    posterPath: PropTypes.string,
  }).isRequired,
  onSelect: PropTypes.func,
  onFavorite: PropTypes.func,
  isFavorited: PropTypes.bool,
};
