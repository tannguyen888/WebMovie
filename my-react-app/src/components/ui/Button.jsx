/**
 * 🔘 Button Component
 * Reusable button with variants
 */
import PropTypes from "prop-types";

const variantClasses = {
  primary: "bg-red-600 hover:bg-red-700 text-white",
  secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  danger: "bg-red-800 hover:bg-red-900 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
};

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({ children, variant = "primary", size = "md", onClick, disabled = false, loading = false, ...props }) {
  return (
    <button
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "success"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
