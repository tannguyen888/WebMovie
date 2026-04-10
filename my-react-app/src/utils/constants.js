/**
 * 🔧 Constants - Tất cả hằng số ứng dụng
 */

// ============== API Configuration ==============
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";
export const API_AUTH = `${API_BASE_URL}/auth`;
export const API_MOVIES = `${API_BASE_URL}/movies`;
export const API_USERS = `${API_BASE_URL}/users`;
export const API_FAVORITES = `${API_BASE_URL}/favorites`;
export const API_REVIEWS = `${API_BASE_URL}/reviews`;
export const API_GENRES = `${API_BASE_URL}/genres`;

// ============== Local Storage Keys ==============
export const TOKEN_KEY = "authToken";
export const USER_KEY = "currentUser";
export const THEME_KEY = "theme";
export const LANGUAGE_KEY = "language";

// ============== App Configuration ==============
export const APP_NAME = "Movie App";
export const APP_VERSION = "1.0.0";
export const PAGE_SIZE = 20;
export const ITEMS_PER_PAGE = 20;

// ============== Messages ==============
export const MESSAGES = {
  SUCCESS: {
    LOGIN: "Đăng nhập thành công",
    REGISTER: "Đăng ký thành công",
    LOGOUT: "Đăng xuất thành công",
    ADD_FAVORITE: "Thêm yêu thích thành công",
    REMOVE_FAVORITE: "Xóa yêu thích thành công",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Tên đăng nhập hoặc mật khẩu sai",
    USER_NOT_FOUND: "Người dùng không tìm thấy",
    NETWORK_ERROR: "Lỗi kết nối mạng",
    SOMETHING_WENT_WRONG: "Đã xảy ra lỗi",
  },
};

// ============== User Roles ==============
export const ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
};

// ============== Movie Genres ==============
export const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

// ============== Rating Limits ==============
export const RATING = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 0,
};
