package com.movieapp.util;

import java.util.regex.Pattern;

public class ValidationUtils {
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final String USERNAME_PATTERN = "^[a-zA-Z0-9_]{3,20}$";
    private static final Pattern EMAIL_REGEX = Pattern.compile(EMAIL_PATTERN);
    private static final Pattern USERNAME_REGEX = Pattern.compile(USERNAME_PATTERN);

    public static boolean isValidEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }
        return EMAIL_REGEX.matcher(email).matches();
    }

    public static boolean isValidUsername(String username) {
        if (username == null || username.isEmpty()) {
            return false;
        }
        return USERNAME_REGEX.matcher(username).matches();
    }

    public static boolean isValidPassword(String password) {
        if (password == null) {
            return false;
        }
        return password.length() >= 6;
    }

    public static String sanitizeInput(String input) {
        if (input == null) {
            return "";
        }
        return input.trim()
                .replaceAll("[<>\"'%;()&+]", "")
                .replaceAll("\\s+", " ");
    }

    private ValidationUtils() {
        throw new IllegalStateException("Utility class");
    }
}
