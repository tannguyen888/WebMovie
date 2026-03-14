package com.movieapp.service;

import com.movieapp.model.Movie;
import com.movieapp.repository.MovieRepository;
import com.movieapp.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + id));
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public List<Movie> searchMovies(String keyword) {
        return movieRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public List<Movie> getMoviesByGenre(String genre) {
        return movieRepository.findByGenre(genre);
    }

    public List<Movie> getMoviesByYear(String year) {
        return movieRepository.findByYear(year);
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public Movie updateMovie(Long id, Movie updatedMovie) {
        Movie movie = getMovieById(id);
        if (updatedMovie.getTitle() != null) {
            movie.setTitle(updatedMovie.getTitle());
        }
        if (updatedMovie.getGenre() != null) {
            movie.setGenre(updatedMovie.getGenre());
        }
        if (updatedMovie.getDescription() != null) {
            movie.setDescription(updatedMovie.getDescription());
        }
        if (updatedMovie.getPosterPath() != null) {
            movie.setPosterPath(updatedMovie.getPosterPath());
        }
        if (updatedMovie.getYear() != null) {
            movie.setYear(updatedMovie.getYear());
        }
        return movieRepository.save(movie);
    }

    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }
}
