package com.movieapp.service;

import com.movieapp.model.Genre;
import com.movieapp.repository.GenreRepository;
import com.movieapp.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with id: " + id));
    }

    public Genre getGenreByName(String name) {
        return genreRepository.findByName(name)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with name: " + name));
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre saveGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public Genre updateGenre(Long id, Genre updatedGenre) {
        Genre genre = getGenreById(id);
        if (updatedGenre.getName() != null) {
            genre.setName(updatedGenre.getName());
        }
        return genreRepository.save(genre);
    }

    public void deleteGenre(Long id) {
        genreRepository.deleteById(id);
    }
}
