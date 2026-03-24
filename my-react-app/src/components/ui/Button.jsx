/**
 * 🔘 Button Component
 * Reusable button with variants
 */
import PropTypes from "prop-types";
import "./Button.css";

export function Button({ children, variant = "primary", size = "md", onClick, disabled = false, ...props }) {
  // TODO:
  // 1. Apply variant classes (primary, secondary, danger, success)
  // 2. Apply size classes (sm, md, lg)
  // 3. Handle disabled state
  // 4. Add loading spinner if loading prop exists

  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
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
};
