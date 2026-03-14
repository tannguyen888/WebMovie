package com.movieapp.repository;

import com.movieapp.model.Favorite;
import com.movieapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUser(User user);

    Optional<Favorite> findByUserAndMovieId(User user, String movieId);

    void deleteByUserAndMovieId(User user, String movieId);

    boolean existsByUserAndMovieId(User user, String movieId);

    long countByUser(User user);
}
