package com.movieapp.controller;

import com.movieapp.model.Genre;
import com.movieapp.service.GenreService;
import com.movieapp.util.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constants.GENRES_BASE_PATH)
@CrossOrigin(origins = "*", maxAge = 3600)
public class GenreController {
    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        return ResponseEntity.ok(genreService.getAllGenres());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Genre> getGenreById(@PathVariable Long id) {
        return ResponseEntity.ok(genreService.getGenreById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Genre> getGenreByName(@PathVariable String name) {
        return ResponseEntity.ok(genreService.getGenreByName(name));
    }

    @PostMapping
    public ResponseEntity<Genre> createGenre(@RequestBody Genre genre) {
        return ResponseEntity.status(HttpStatus.CREATED).body(genreService.saveGenre(genre));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Genre> updateGenre(@PathVariable Long id, @RequestBody Genre genre) {
        return ResponseEntity.ok(genreService.updateGenre(id, genre));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGenre(@PathVariable Long id) {
        genreService.deleteGenre(id);
        return ResponseEntity.noContent().build();
    }
}
