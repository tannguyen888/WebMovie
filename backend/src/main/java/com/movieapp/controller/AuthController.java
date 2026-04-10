package com.movieapp.controller;

import com.movieapp.dto.request.AuthRequest;
import com.movieapp.dto.response.AuthResponse;
import com.movieapp.service.AuthService;
import com.movieapp.security.JwtService;
import com.movieapp.util.Constants;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.AUTH_BASE_PATH)
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // TODO: Enable when Firebase is fully configured
    // @PostMapping("/register/google")
    // public ResponseEntity<AuthResponse> registerWithGoogle(@RequestBody String
    // token) {
    // AuthResponse response = authService.registerWithGoogle(token);
    // return ResponseEntity.status(HttpStatus.CREATED).body(response);
    // }

    // TODO: Enable when Firebase is fully configured
    // @PostMapping("/login/google")
    // public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String>
    // body) { ... }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith(Constants.JWT_PREFIX)) {
            throw new RuntimeException(Constants.INVALID_TOKEN);
        }
        String token = authHeader.substring(Constants.JWT_PREFIX_LENGTH);
        String username = authService.getUsernameFromToken(token);
        return ResponseEntity.ok(username);
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith(Constants.JWT_PREFIX)) {
            return ResponseEntity.ok(false);
        }
        String token = authHeader.substring(Constants.JWT_PREFIX_LENGTH);
        boolean isValid = jwtService.validateToken(token);
        return ResponseEntity.ok(isValid);
    }
}