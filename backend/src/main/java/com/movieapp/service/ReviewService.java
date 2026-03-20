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
import java.util.List;
import java.util.stream.Collectors;

/**
 * ReviewService - Xử lý logic review
 * 
 * TODO: Thêm @Service annotation
 */
@Service
public class ReviewService {

    /**
     * TODO: Khai báo 3 final repositories:
     * - private final ReviewRepository reviewRepository;
     * - private final UserRepository userRepository;
     * - private final MovieRepository movieRepository;
     */

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final MovieRepository movieRepository;

    /**
     * TODO: Viết Constructor với 3 repositories
     * - Dependency Injection (Spring tự inject)
     * - Assign vào các field
     */
    public ReviewService(ReviewRepository reviewRepository, UserRepository userRepository,
            MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
    }

    /**
     * ============================================
     * 🎯 CREATE - Thêm review mới
     * ============================================
     */
    @Transactional
    public ReviewResponse addReview(Long userId, Long movieId, ReviewRequest request) {
        try {
            if (request.getComment() == null || request.getComment().isEmpty()) {
                throw new IllegalArgumentException("Comment cannot be null or empty");
            }
            if (request.getComment().length() > 500) {
                throw new IllegalArgumentException("Comment too long (max 500)");
            }
            if (request.getRating() < 1 || request.getRating() > 5) {
                throw new IllegalArgumentException("Rating must be between 1 and 5");
            }

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            Movie movie = movieRepository.findById(movieId)
                    .orElseThrow(() -> new IllegalArgumentException("Movie not found"));

            if (reviewRepository.existsByUserIdAndMovieId(userId, movieId)) {
                throw new IllegalArgumentException("You already reviewed this movie");
            }

            Review newReview = new Review(userId, movieId, request.getRating(), request.getComment());
            Review savedReview = reviewRepository.save(newReview);

            return ReviewResponse.from(savedReview);

        } catch (Exception e) {
            throw new RuntimeException("Error adding review: " + e.getMessage());
        }
    }

    public boolean validateRating(String rating) {
        try {
            int getRating = Integer.parseInt(rating);
            if (getRating < 1 || getRating > 5) {
                throw new IllegalArgumentException("Rating must be between 1 and 5");
            }
        } catch (Exception e) {
            throw new IllegalArgumentException("Rating must be a valid integer");
        }
        return false;
    }

    public boolean isBelow1(String rating) {
        try {
            int ratingValue = Integer.parseInt(rating);
            return ratingValue < 1;
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Rating must be a valid integer");
        }
    }

    /**
     * TODO: Viết method addReview()
     * 
     * Parameters:
     * - Long userId: User ID
     * - Long movieId: Movie ID
     * - ReviewRequest request: {rating, comment}
     * 
     * Steps:
     * 1️⃣ TODO: Validate rating
     * - Check: 1 <= rating <= 5
     * - Throw: InvalidRatingException nếu sai
     * 
     * 2️⃣ TODO: Validate comment
     * - Check: comment.length() <= 500
     * - Throw: InvalidCommentException nếu sai
     * 
     * 3️⃣ TODO: Fetch user by userId
     * - userRepository.findById(userId)
     * - Throw: ResourceNotFoundException nếu không tìm thấy
     * 
     * 4️⃣ TODO: Fetch movie by movieId
     * - movieRepository.findById(movieId)
     * - Throw: ResourceNotFoundException nếu không tìm thấy
     * 
     * 5️⃣ TODO: Check duplicate review
     * - reviewRepository.existsByUserIdAndMovieId(userId, movieId)
     * - Throw: DuplicateReviewException nếu đã tồn tại
     * 
     * 6️⃣ TODO: Create new Review object
     * - new Review(userId, movieId, rating, comment)
     * - Set createdAt = LocalDateTime.now()
     * 
     * 7️⃣ TODO: Save to database
     * - reviewRepository.save(review)
     * 
     * 8️⃣ TODO: Convert to ReviewResponse DTO
     * - ReviewResponse.from(savedReview)
     * 
     * Return: ReviewResponse
     */
    public ReviewResponse getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return ReviewResponse.from(review);
    }

    /**
     * TODO: Viết method getUserReviewForMovie()
     * 
     * Parameters:
     * - Long userId
     * - Long movieId
     * 
     * Steps:
     * 1️⃣ TODO: Fetch user & movie (validate exists)
     * 2️⃣ TODO: Find review by user & movie
     * - reviewRepository.findByUserIdAndMovieId(userId, movieId)
     * - .orElseThrow()
     * 3️⃣ TODO: Convert và return ReviewResponse
     * 
     * Return: ReviewResponse
     */
    public ReviewResponse getUserReviewForMovie(Long userId, Long movieId) {
        // TODO: Implement here
        return null;
    }

    /**
     * ============================================
     * 📖 READ - Lấy danh sách reviews
     * ============================================
     */

    /**
     * TODO: Viết method getMovieReviews()
     * 
     * Parameters:
     * - Long movieId
     * - Pageable pageable: {page, size, sort}
     * 
     * Steps:
     * 1️⃣ TODO: Check movie exists
     * - movieRepository.existsById(movieId)
     * - orElseThrow ResourceNotFoundException
     * 
     * 2️⃣ TODO: Query reviews với pagination
     * - reviewRepository.findByMovieId(movieId, pageable)
     * - Trả về Page<Review>
     * 
     * 3️⃣ TODO: Convert mỗi review sang ReviewResponse
     * - page.map(ReviewResponse::from)
     * 
     * Return: Page<ReviewResponse>
     */
    public Page<ReviewResponse> getMovieReviews(Long movieId, Pageable pageable) {
        // TODO: Implement here
        return null;
    }

    /**
     * TODO: Viết method getUserReviews()
     * 
     * Parameters:
     * - Long userId
     * - Pageable pageable
     * 
     * Gets all reviews by user
     */
    public Page<ReviewResponse> getUserReviews(Long userId, Pageable pageable) {
        // TODO: Implement here
        return null;
    }

    /**
     * ============================================
     * 📊 READ - Thống kê
     * ============================================
     */

    /**
     * TODO: Viết method getAverageRating()
     * 
     * Parameters:
     * - Long movieId
     * 
     * Steps:
     * 1️⃣ TODO: Check movie exists
     * 2️⃣ TODO: Get average rating
     * - reviewRepository.getAverageRating(movieId)
     * - Custom @Query method
     * 3️⃣ TODO: Return 0.0 nếu không có reviews
     * 
     * Return: Double (average)
     */
    public Double getAverageRating(Long movieId) {
        // TODO: Implement here
        return null;
    }

    /**
     * TODO: Viết method getReviewCount()
     * 
     * Parameters:
     * - Long movieId
     * 
     * Steps:
     * 1️⃣ TODO: Count reviews
     * - reviewRepository.countByMovieId(movieId)
     * 
     * Return: long
     */
    public long getReviewCount(Long movieId) {
        // TODO: Implement here
        return 0;
    }

    /**
     * ============================================
     * 🔄 UPDATE - Cập nhật review
     * ============================================
     */

    /**
     * TODO: Viết method updateReview()
     * 
     * Parameters:
     * - Long reviewId: Review cần update
     * - Long userId: Ai update (check ownership)
     * - ReviewRequest request: Dữ liệu mới
     * 
     * Steps:
     * 1️⃣ TODO: Fetch review by id
     * - reviewRepository.findById(reviewId)
     * - orElseThrow ResourceNotFoundException
     * 
     * 2️⃣ TODO: Check ownership
     * - if (review.getUserId() != userId)
     * - throw UnauthorizedException("Only owner can edit")
     * 
     * 3️⃣ TODO: Validate new data
     * - Validate rating (1-5)
     * - Validate comment length
     * 
     * 4️⃣ TODO: Update fields
     * - review.setRating(request.getRating())
     * - review.setComment(request.getComment())
     * - TODO: Set updatedAt = LocalDateTime.now()
     * 
     * 5️⃣ TODO: Save to database
     * - reviewRepository.save(review)
     * 
     * 6️⃣ TODO: Convert và return ReviewResponse
     * 
     * Return: ReviewResponse
     */
    @Transactional
    public ReviewResponse updateReview(Long reviewId, Long userId, ReviewRequest request) {
        // TODO: Implement here
        return null;
    }

    /**
     * ============================================
     * 🗑️ DELETE - Xóa review
     * ============================================
     */

    /**
     * TODO: Viết method deleteReview()
     * 
     * Parameters:
     * - Long reviewId
     * - Long userId: Ai xóa (check ownership)
     * - String userRole: "USER" hoặc "ADMIN"
     * 
     * Steps:
     * 1️⃣ TODO: Fetch review by id
     * - reviewRepository.findById(reviewId)
     * - orElseThrow ResourceNotFoundException
     * 
     * 2️⃣ TODO: Check permission
     * - boolean isOwner = review.getUserId().equals(userId)
     * - boolean isAdmin = "ADMIN".equals(userRole)
     * - if (!isOwner && !isAdmin) throw UnauthorizedException
     * 
     * 3️⃣ TODO: Delete
     * - reviewRepository.deleteById(reviewId)
     * 
     * Return: void
     */
    @Transactional
    public void deleteReview(Long reviewId, Long userId, String userRole) {
        // TODO: Implement here
    }

    /**
     * ============================================
     * 🧹 HELPER METHODS
     * ============================================
     */

    /**
     * TODO: Viết method canUserReview()
     * 
     * Check nếu user có thể review phim được không
     * (chỉ review 1 lần)
     * 
     * Parameters:
     * - Long userId
     * - Long movieId
     * 
     * Steps:
     * 1️⃣ TODO: Check if review exists
     * - !reviewRepository.existsByUserIdAndMovieId(userId, movieId)
     * 
     * Return: boolean
     */
    public boolean canUserReview(Long userId, Long movieId) {
        // TODO: Implement here
        return false;
    }

    /**
     * TODO: (Optional) Viết method deleteAllByMovie()
     * 
     * Xóa tất cả reviews của 1 phim
     * (khi admin delete phim)
     * 
     * Parameters:
     * - Long movieId
     */
    @Transactional
    public void deleteAllByMovie(Long movieId) {
        // TODO: Implement here
    }

    /**
     * TODO: (Optional) Viết method deleteAllByUser()
     * 
     * Xóa tất cả reviews của 1 user
     * (khi user delete account)
     * 
     * Parameters:
     * - Long userId
     */
    @Transactional
    public void deleteAllByUser(Long userId) {
        // TODO: Implement here
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}