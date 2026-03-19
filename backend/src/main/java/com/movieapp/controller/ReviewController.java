package com.movieapp.controller;

import com.movieapp.dto.request.AuthRequest;
import com.movieapp.dto.response.AuthResponse;
import com.movieapp.service.AuthService;
import com.movieapp.security.JwtService;
import com.movieapp.util.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/reviews")
    public ResponseEntity<?> saveReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.saveReview(review));
    }
}
