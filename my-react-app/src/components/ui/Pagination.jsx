/**
 * 📄 Pagination Component
 * Page navigation
 */
import PropTypes from "prop-types";
import "./Pagination.css";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  // TODO:
  // 1. Display page numbers
  // 2. Show prev/next buttons
  // 3. Highlight current page
  // 4. Disable prev on page 1, next on last page

  return (
    <div className="pagination">
      {/* Pagination controls */}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
