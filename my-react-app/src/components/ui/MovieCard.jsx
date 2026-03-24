/**
 * 🎭 MovieCard Component
 * Display movie card in grid/list
 */
import PropTypes from "prop-types";
import "./MovieCard.css";

export function MovieCard({ movie, onSelect, onFavorite, isFavorited }) {
  // TODO: 
  // 1. Render poster image
  // 2. Display title, year, rating
  // 3. Add click handler for onSelect
  // 4. Add favorite button with heart icon

  return (
    <div className="movie-card">
      {/* Card content */}
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    year: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
  onFavorite: PropTypes.func,
  isFavorited: PropTypes.bool,
};
