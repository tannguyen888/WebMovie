/**
 * ⏳ LoadingSpinner Component
 * Loading indicator
 */

export function LoadingSpinner({ size = "md", fullScreen = false }) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-gray-600 border-t-red-600 rounded-full animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">
      {spinner}
    </div>
  );
}
