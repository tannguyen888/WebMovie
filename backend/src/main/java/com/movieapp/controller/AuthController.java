package com.movieapp.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.internal.FirebaseService;
import com.movieapp.dto.request.AuthRequest;
import com.movieapp.dto.response.AuthResponse;
import com.movieapp.service.AuthService;
import com.movieapp.security.JwtService;
import com.movieapp.util.Constants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constants.AUTH_BASE_PATH)
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
    private final AuthService authService;
    private final JwtService jwtService;
    @SuppressWarnings("rawtypes")
    @Autowired
    private FirebaseService firebaseService;

    public AuthController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/register/google")
    public ResponseEntity<AuthResponse> registerWithGoogle(@RequestBody String token) {
        AuthResponse response = authService.registerWithGoogle(token);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login/google")
    public ResponseEntity<JwtResponse> loginWithGoogle(@RequestBody Map<String, String> body) {
        String idToken = body.get("tokenId");

        try {
            AuthResponse response = authService.loginWithGoogle(idToken);
            // Xác thực ID Token từ Google
            FirebaseToken decodedToken = firebaseService.verifyIdToken(idToken);
            String userId = decodedToken.getUid();

            // Tạo JWT token cho người dùng
            String jwtToken = generateJwtToken(userId);

            // Trả về JWT token cho frontend
            return ResponseEntity.ok(new JwtResponse(jwtToken));
        } catch (FirebaseAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new JwtResponse("Invalid Google token"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JwtResponse("An error occurred during Google login"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    private String generateJwtToken(String userId) {
        // Tạo JWT token
        return Jwts.builder()
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 giờ
                .signWith(SignatureAlgorithm.HS512, "secret_key") // Sử dụng một key bảo mật
                .compact();
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

class JwtResponse {
    private String token;

    public JwtResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}