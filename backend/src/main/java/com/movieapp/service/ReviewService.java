package com.movieapp.service;

import com.movieapp.model.Review;
import com.movieapp.model.User;
import com.movieapp.model.Movie;
import com.movieapp.repository.ReviewRepository;
import com.movieapp.repository.UserRepository;
import com.movieapp.repository.MovieRepository;
import com.movieapp.dto.request.ReviewRequest;
import com.movieapp.dto.response.ReviewResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    private static final String ROLE_ADMIN = "ADMIN";

    public ReviewService(ReviewRepository reviewRepository,
            UserRepository userRepository,
            MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    // =========================
    // CREATE
    // =========================
    @Transactional
    public ReviewResponse addReview(Long userId, Long movieId, ReviewRequest request) {

        validateComment(request.getComment());
        validateRating(request.getRating());

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        if (reviewRepository.existsByUserIdAndMovieId(userId, movieId)) {
            throw new RuntimeException("You already reviewed this movie");
        }

        Review review = new Review(userId, movieId, request.getRating(), request.getComment());
        review.setCreatedAt(LocalDateTime.now());

        return ReviewResponse.from(reviewRepository.save(review));
    }

    // =========================
    // READ
    // =========================
    public ReviewResponse getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        return ReviewResponse.from(review);
    }

    public ReviewResponse getUserReviewForMovie(Long userId, Long movieId) {
        return reviewRepository.findByUserIdAndMovieId(userId, movieId)
                .map(ReviewResponse::from)
                .orElseThrow(() -> new RuntimeException("User's review not found"));
    }

    public Page<ReviewResponse> getMovieReviews(Long movieId, Pageable pageable) {
        if (!movieRepository.existsById(movieId)) {
            throw new RuntimeException("Movie not found");
        }

        return reviewRepository.findByMovieId(movieId, pageable)
                .map(ReviewResponse::from);
    }

    public Page<ReviewResponse> getUserReviews(Long userId, Pageable pageable) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return reviewRepository.findByUserId(userId, pageable)
                .map(ReviewResponse::from);
    }

    // =========================
    // STATS
    // =========================
    public Double getAverageRating(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new RuntimeException("Movie not found");
        }

        Double avg = reviewRepository.getAverageRating(movieId);
        return avg != null ? avg : 0.0;
    }

    public long getReviewCount(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new RuntimeException("Movie not found");
        }

        return reviewRepository.countByMovieId(movieId);
    }

    // =========================
    // UPDATE
    // =========================
    @Transactional
    public ReviewResponse updateReview(Long reviewId, Long userId, ReviewRequest request) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("Only owner can edit this review");
        }

        validateRating(request.getRating());
        validateComment(request.getComment());

        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setUpdatedAt(LocalDateTime.now());

        return ReviewResponse.from(reviewRepository.save(review));
    }

    // =========================
    // DELETE
    // =========================
    @Transactional
    public void deleteReview(Long reviewId, Long userId, String userRole) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        boolean isOwner = review.getUserId().equals(userId);
        boolean isAdmin = ROLE_ADMIN.equals(userRole);

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("Only owner or admin can delete");
        }

        reviewRepository.deleteById(reviewId);
    }

    @Transactional
    public void deleteAllByMovie(Long movieId) {
        if (!movieRepository.existsById(movieId)) {
            throw new RuntimeException("Movie not found");
        }

        reviewRepository.deleteByMovieId(movieId);
    }

    @Transactional
    public void deleteAllByUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        reviewRepository.deleteByUserId(userId);
    }

    // =========================
    // HELPER
    // =========================
    public boolean canUserReview(Long userId, Long movieId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        if (!movieRepository.existsById(movieId)) {
            throw new RuntimeException("Movie not found");
        }

        return !reviewRepository.existsByUserIdAndMovieId(userId, movieId);
    }

    // =========================
    // VALIDATION
    // =========================
    private void validateRating(int rating) {
        if (rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
    }

    private void validateComment(String comment) {
        if (comment == null || comment.isBlank()) {
            throw new IllegalArgumentException("Comment cannot be empty");
        }

        if (comment.length() > 500) {
            throw new IllegalArgumentException("Comment too long (max 500)");
        }
    }
}