package com.movieapp.controller;

import com.movieapp.model.Favorite;
import com.movieapp.model.User;
import com.movieapp.service.FavoriteService;
import com.movieapp.service.AuthService;
import com.movieapp.util.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.FAVORITES_BASE_PATH)
@CrossOrigin(origins = "*", maxAge = 3600)
public class FavoriteController {
    private final FavoriteService favoriteService;
    private final AuthService authService;

    public FavoriteController(FavoriteService favoriteService, AuthService authService) {
        this.favoriteService = favoriteService;
        this.authService = authService;
    }

    private User getUserFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith(Constants.JWT_PREFIX)) {
            throw new RuntimeException(Constants.INVALID_TOKEN);
        }
        String token = authHeader.substring(Constants.JWT_PREFIX_LENGTH);
        String username = authService.getUsernameFromToken(token);
        return authService.getUserByUsername(username);
    }

    @GetMapping
    public ResponseEntity<List<Favorite>> getFavorites(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(favoriteService.getFavoritesByUser(user));
    }

    @PostMapping
    public ResponseEntity<Favorite> addFavorite(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String movieId,
            @RequestParam String title,
            @RequestParam(required = false) String posterPath) {
        User user = getUserFromToken(authHeader);
        Favorite favorite = favoriteService.addFavorite(user, movieId, title, posterPath);
        return ResponseEntity.status(HttpStatus.CREATED).body(favorite);
    }

    @DeleteMapping
    public ResponseEntity<Void> removeFavorite(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String movieId) {
        User user = getUserFromToken(authHeader);
        favoriteService.removeFavorite(user, movieId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String movieId) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(favoriteService.isFavorite(user, movieId));
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countFavorites(@RequestHeader("Authorization") String authHeader) {
        User user = getUserFromToken(authHeader);
        return ResponseEntity.ok(favoriteService.countFavorites(user));
    }
}
