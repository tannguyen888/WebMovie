package com.movieapp.util;

public class Constants {
    // JWT
    public static final String JWT_PREFIX = "Bearer ";
    public static final int JWT_PREFIX_LENGTH = 7;

    // Roles
    public static final String ROLE_USER = "USER";
    public static final String ROLE_ADMIN = "ADMIN";

    // Status
    public static final String STATUS_ACTIVE = "active";
    public static final String STATUS_INACTIVE = "inactive";

    // API Paths
    public static final String API_BASE_PATH = "/api";
    public static final String AUTH_BASE_PATH = API_BASE_PATH + "/auth";
    public static final String MOVIES_BASE_PATH = API_BASE_PATH + "/movies";
    public static final String FAVORITES_BASE_PATH = API_BASE_PATH + "/favorites";
    public static final String GENRES_BASE_PATH = API_BASE_PATH + "/genres";
    public static final String USERS_BASE_PATH = API_BASE_PATH + "/users";

    // Error Messages
    public static final String USER_NOT_FOUND = "User not found";
    public static final String INVALID_TOKEN = "Invalid token";
    public static final String INSUFFICIENT_PERMISSIONS = "You do not have permission to perform this action";
    public static final String USER_ALREADY_EXISTS = "Username already exists";
    public static final String EMAIL_ALREADY_EXISTS = "Email already exists";
    public static final String INVALID_CREDENTIALS = "Invalid username or password";
    public static final String MOVIE_NOT_FOUND = "Movie not found";
    public static final String GENRE_NOT_FOUND = "Genre not found";

    // Success Messages
    public static final String LOGIN_SUCCESSFUL = "Login successful";
    public static final String REGISTRATION_SUCCESSFUL = "Registration successful";
    public static final String LOGOUT_SUCCESSFUL = "Logout successful";

    private Constants() {
        throw new IllegalStateException("Utility class");
    }
}
