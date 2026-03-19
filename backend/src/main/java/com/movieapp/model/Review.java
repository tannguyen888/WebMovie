package com.movieapp.model;

import java.lang.annotation.Inherited;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(nullable = false, unique = true)
private Long userId;

@Column(nullable = false, unique = true)
private Long movieId;
@Column(nullable = false)
private int rating;

@Column(columnDefinition = "TEXT")
private String comment;

@Column(nullable = false, updatable = false)
private LocalDateTime createdAt;

@PrePersist
protected void onCreate() {
    createdAt = LocalDateTime.now();
}
@Column(nullable = false, updatable = false )
private LocalDateTime updatedAt;

@PrePersist
protected void onUpdate() {
    updatedAt = LocalDateTime.now();
}

public Review(Long userId, Long movieId, int rating, String comment) {
    this.userId = userId;
    this.movieId = movieId;
    this.rating = rating;
    this.comment = comment;
}
@Override
public String toString() {
    return "Review{" +
            "id=" + id +
            ", userId=" + userId +
            ", movieId=" + movieId +
            ", rating=" + rating +
            ", comment='" + comment + '\'' +
            ", createdAt=" + createdAt +
            ", updatedAt=" + updatedAt +
            '}';
}



}
