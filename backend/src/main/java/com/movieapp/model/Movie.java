package com.movieapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String genre;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String posterPath;
    private String year;

    public Movie(String title, String genre, String description, String posterPath, String year) {
        this.title = title;
        this.genre = genre;
        this.description = description;
        this.posterPath = posterPath;
        this.year = year;
    }
}
