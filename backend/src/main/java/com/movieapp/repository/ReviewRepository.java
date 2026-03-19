package com.movieapp.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.movieapp.model.Review;
import com.movieapp.model.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // ✅ 1. Tìm review của 1 user cho 1 phim
    Review findByUserIdAndMovieId(Long userId, Long movieId);

    // ✅ 2. Check xem user đã review phim này chưa?
    boolean existsByUserIdAndMovieId(Long userId, Long movieId);

    // ✅ 3. Xóa review của user cho phim
    void deleteByUserIdAndMovieId(Long userId, Long movieId);

    // ✅ 4. Lấy tất cả review của 1 user
    List<Review> findByUserId(Long userId);

    // ✅ 5. Lấy tất cả review của 1 phim
    List<Review> findByMovieId(Long movieId);

    // ✅ 6. Đếm review của 1 phim
    long countByMovieId(Long movieId);

    // ✅ 7. Phân trang review của phim
    Page<Review> findByMovieId(Long movieId, Pageable pageable);

    // ✅ 8. Custom query - tính rating trung bình
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.movieId = :movieId")
    Double getAverageRating(@Param("movieId") Long movieId);

}
