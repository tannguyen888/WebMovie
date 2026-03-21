package com.movieapp.repository;

import com.movieapp.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByGenre(String genre);

    List<Movie> findByTitleContainingIgnoreCase(String title);

    List<Movie> findByReleaseYear(String releaseYear);

    // Popular movies
    @Query(value = "SELECT * FROM movies WHERE type = 'movie' ORDER BY rating DESC LIMIT 50", nativeQuery = true)
    List<Movie> findPopularMovies();

    // Popular TV shows
    @Query(value = "SELECT * FROM movies WHERE type = 'tv' ORDER BY rating DESC LIMIT 50", nativeQuery = true)
    List<Movie> findPopularTvShows();
}
