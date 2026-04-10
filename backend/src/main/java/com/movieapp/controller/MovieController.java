package com.movieapp.controller;

import com.movieapp.model.Movie;
import com.movieapp.service.MovieService;
import com.movieapp.service.GenreService;
import com.movieapp.util.Constants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    // New: list all movies (frontend uses /api/movies)
    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/movies/popular")
    public ResponseEntity<?> getPopularMovies() {
        List<Movie> movies = movieService.getPopularMovies();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", Map.of(
                        "movies", movies)));
    }

    @GetMapping("/tv/popular")
    public ResponseEntity<?> getPopularTvShows() {
        List<Movie> shows = movieService.getPopularTvShows();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", Map.of(
                        "tv", shows)));
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<?> getMovieDetail(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", movie));
    }

    @GetMapping("/movies/trending")
    public ResponseEntity<?> getTrendingMovies(
            @RequestParam(required = false) String type,
            @RequestParam(defaultValue = "12") int limit) {
        List<Movie> movies = movieService.getTrendingMovies(type, limit);
        String resolvedType = (type == null || type.isBlank()) ? "all" : type.toLowerCase();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", Map.of(
                        "type", resolvedType,
                        "movies", movies)));
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String q) {
        List<Movie> results = movieService.searchMovies(q);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", Map.of(
                        "movies", results,
                        "tv", results)));
    }

    // ===== CRUD Endpoints =====

    @PostMapping("/movies")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        Movie saved = movieService.saveMovie(movie);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        Movie updated = movieService.updateMovie(id, movie);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/movies/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Movie deleted"));
    }
}