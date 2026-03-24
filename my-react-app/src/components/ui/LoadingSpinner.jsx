/**
 * ⏳ LoadingSpinner Component
 * Loading indicator
 */
import "./LoadingSpinner.css";

export function LoadingSpinner({ size = "md", fullScreen = false }) {
  // TODO:
  // 1. Create spinner animation
  // 2. Support size variants (sm, md, lg)
  // 3. Option for fullscreen overlay

  return (
    <div className={`spinner spinner-${size} ${fullScreen ? "fullscreen" : ""}`}>
      {/* Spinner animation */}
    </div>
  );
}
