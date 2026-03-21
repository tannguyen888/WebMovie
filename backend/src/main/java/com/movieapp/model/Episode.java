package com.movieapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "episodes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Episode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String episodeTitle;

    @Column(columnDefinition = "TEXT")
    private String linkEmbed;

    @Column(columnDefinition = "TEXT")
    private String linkM3u8;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie; // Foreign key to Movie

    public Episode(String episodeTitle, String linkEmbed, String linkM3u8, Movie movie) {
        this.episodeTitle = episodeTitle;
        this.linkEmbed = linkEmbed;
        this.linkM3u8 = linkM3u8;
        this.movie = movie;
    }
}