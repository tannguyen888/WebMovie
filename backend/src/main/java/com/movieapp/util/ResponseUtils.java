package com.movieapp.util;

import com.movieapp.dto.response.ErrorResponse;
import com.movieapp.dto.response.AuthResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ResponseUtils {

    public static ResponseEntity<ErrorResponse> buildErrorResponse(
            HttpStatus status,
            String message,
            String error,
            String path) {
        ErrorResponse response = new ErrorResponse(
                status.value(),
                message,
                error);
        response.setPath(path);
        response.setTimestamp(LocalDateTime.now());
        return new ResponseEntity<>(response, status);
    }

    public static ResponseEntity<AuthResponse> buildSuccessAuthResponse(
            String token,
            String message,
            String username,
            Long userId) {
        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setMessage(message);
        response.setUsername(username);
        response.setUserId(userId);
        return ResponseEntity.ok(response);
    }

    private ResponseUtils() {
        throw new IllegalStateException("Utility class");
    }
}
