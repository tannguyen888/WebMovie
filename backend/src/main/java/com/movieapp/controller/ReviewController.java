package com.movieapp.controller;

import com.movieapp.dto.request.ReviewRequest;
import com.movieapp.service.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<?> addReview(@RequestParam Long userId, @RequestParam Long movieId,
            @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(userId, movieId, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping("/user/{userId}/movie/{movieId}")
    public ResponseEntity<?> getUserReviewForMovie(@PathVariable Long userId, @PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getUserReviewForMovie(userId, movieId));
    }

    @GetMapping("/movie/{movieId}")
    public ResponseEntity<?> getMovieReviews(@PathVariable Long movieId, Pageable pageable) {
        return ResponseEntity.ok(reviewService.getMovieReviews(movieId, pageable));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserReviews(@PathVariable Long userId, Pageable pageable) {
        return ResponseEntity.ok(reviewService.getUserReviews(userId, pageable));
    }

    @GetMapping("/movie/{movieId}/average")
    public ResponseEntity<?> getAverageRating(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getAverageRating(movieId));
    }

    @GetMapping("/movie/{movieId}/count")
    public ResponseEntity<?> getReviewCount(@PathVariable Long movieId) {
        return ResponseEntity.ok(reviewService.getReviewCount(movieId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable Long id, @RequestParam Long userId,
            @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.updateReview(id, userId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id, @RequestParam Long userId,
            @RequestParam String userRole) {
        reviewService.deleteReview(id, userId, userRole);
        return ResponseEntity.ok("Review deleted successfully");
    }

    @GetMapping("/user/{userId}/can-review")
    public ResponseEntity<?> canUserReview(@PathVariable Long userId, @RequestParam Long movieId) {
        return ResponseEntity.ok(reviewService.canUserReview(userId, movieId));
    }
}
