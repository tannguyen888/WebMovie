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

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam String q) {
        List<Movie> results = movieService.searchMovies(q);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "content", Map.of(
                        "movies", results,
                        "tv", results)));
    }
}