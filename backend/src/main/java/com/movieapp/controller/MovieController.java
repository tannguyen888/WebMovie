package com.movieapp.controller;

import com.movieapp.model.Movie;
import com.movieapp.service.MovieService;
import com.movieapp.service.GenreService;
import com.movieapp.util.Constants;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.MOVIES_BASE_PATH)
@CrossOrigin(origins = "*", maxAge = 3600)
public class MovieController {
    private final MovieService movieService;
    private final GenreService genreService;

    public MovieController(MovieService movieService, GenreService genreService) {
        this.movieService = movieService;
        this.genreService = genreService;
    }

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Movie>> searchMovies(@RequestParam String keyword) {
        return ResponseEntity.ok(movieService.searchMovies(keyword));
    }

    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<Movie>> getMoviesByGenre(@PathVariable String genre) {
        return ResponseEntity.ok(movieService.getMoviesByGenre(genre));
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<Movie>> getMoviesByYear(@PathVariable String year) {
        return ResponseEntity.ok(movieService.getMoviesByYear(year));
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.saveMovie(movie));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Long id, @RequestBody Movie movie) {
        return ResponseEntity.ok(movieService.updateMovie(id, movie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(Constants.GENRES_BASE_PATH)
    public ResponseEntity<Object> getGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }
}
