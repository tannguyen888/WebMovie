package com.movieapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

import com.movieapp.model.Review;
import com.movieapp.model.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Review findByUserIdAndMovieId(Long userId, Long movieId);

    boolean existsByUserIdAndMovieId(Long userId, Long movieId);

    void deleteByUserIdAndMovieId(Long userId, Long movieId);

    List<Review> findByUserId(Long userId);

    List<Review> findByMovieId(Long movieId);

    long countByMovieId(Long movieId);

    Page<Review> findByMovieId(Long movieId, Pageable pageable);

    void from(User user, Long movieId, String rating, String comment);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.movieId = :movieId")
    Double getAverageRating(@Param("movieId") Long movieId);

}
