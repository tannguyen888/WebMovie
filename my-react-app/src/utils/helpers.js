/**
 * 🛠️ Helper Functions - Utility functions cho ứng dụng
 */

/**
 * Format ngày tháng
 * @param {Date|string} date - Ngày cần format
 * @param {string} format - Format (ví dụ: 'DD/MM/YYYY')
 * @returns {string} Ngày đã format
 */
export const formatDate = (date, format = "DD/MM/YYYY") => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year);
};

/**
 * Cắt text dài
 * @param {string} text - Text cần cắt
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} Text đã cắt
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Debounce function (delay execution)
 * @param {function} func - Function to execute
 * @param {number} delay - Delay in ms
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Get gradient background
 * @param {number} index - Index for color variation
 * @returns {string} Gradient CSS
 */
export const getGradientBg = (index = 0) => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  ];
  return gradients[index % gradients.length];
};
