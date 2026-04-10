/**
 * ⭐ ReviewCard Component
 * Display user review
 */
import PropTypes from "prop-types";

export function ReviewCard({ review, onDelete, onEdit }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-600"}>
      ★
    </span>
  ));

  const date = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("vi-VN")
    : "";

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold text-sm">{review.userName}</span>
          <div className="flex text-lg">{stars}</div>
        </div>
        {date && <span className="text-gray-500 text-xs">{date}</span>}
      </div>

      {review.comment && (
        <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
      )}

      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-1">
          {onEdit && (
            <button
              onClick={() => onEdit(review)}
              className="text-xs text-blue-400 hover:underline"
            >
              Sửa
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(review.id)}
              className="text-xs text-red-400 hover:underline"
            >
              Xóa
            </button>
          )}
        </div>
      )}
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
