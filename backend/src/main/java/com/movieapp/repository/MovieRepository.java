package com.movieapp.repository;

import com.movieapp.model.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT m FROM Movie m WHERE (:type IS NULL OR LOWER(m.type) = LOWER(:type)) AND m.rating IS NOT NULL "
            + "ORDER BY m.rating DESC, m.id DESC")
    List<Movie> findTrendingMovies(@Param("type") String type, Pageable pageable);
}
