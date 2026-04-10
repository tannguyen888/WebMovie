/**
 * 📄 Pagination Component
 * Page navigation
 */
import PropTypes from "prop-types";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const btnBase = "px-3 py-1.5 text-sm rounded transition-colors duration-200";

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button
        className={`${btnBase} text-white/70 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button className={`${btnBase} text-white/70 hover:bg-gray-700`} onClick={() => onPageChange(1)}>1</button>
          {start > 2 && <span className="text-gray-500 px-1">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          className={`${btnBase} ${page === currentPage ? "bg-red-600 text-white" : "text-white/70 hover:bg-gray-700"}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-gray-500 px-1">...</span>}
          <button className={`${btnBase} text-white/70 hover:bg-gray-700`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        className={`${btnBase} text-white/70 hover:text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
