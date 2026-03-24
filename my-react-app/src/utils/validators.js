/**
 * 🔍 Validators - Input validation functions
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} {isValid, strength, message}
 */
export const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;
  const strength = passedChecks <= 2 ? "weak" : passedChecks <= 4 ? "medium" : "strong";
  const isValid = passedChecks >= 3;

  return {
    isValid,
    strength,
    message: isValid ? "Password is strong" : "Password too weak",
    checks,
  };
};

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {boolean} True if valid
 */
export const isValidUsername = (username) => {
  return username.length >= 3 && username.length <= 20 && /^[a-zA-Z0-9_]+$/.test(username);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if string is empty
 * @param {string} str - String to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};
