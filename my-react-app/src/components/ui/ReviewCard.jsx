/**
 * ⭐ ReviewCard Component
 * Display user review
 */
import PropTypes from "prop-types";
import "./ReviewCard.css";

export function ReviewCard({ review, onDelete, onEdit }) {
  // TODO:
  // 1. Display rating stars
  // 2. Show reviewer name
  // 3. Display review text
  // 4. Show review date
  // 5. Add edit/delete buttons if user is owner

  return (
    <div className="review-card">
      {/* Review content */}
    </div>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
