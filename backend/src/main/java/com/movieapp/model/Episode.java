package com.movieapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private Movie movie; // Foreign key to Movie

    public Episode() {
    }

    public Episode(String episodeTitle, String linkEmbed, String linkM3u8, Movie movie) {
        this.episodeTitle = episodeTitle;
        this.linkEmbed = linkEmbed;
        this.linkM3u8 = linkM3u8;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEpisodeTitle() {
        return episodeTitle;
    }

    public void setEpisodeTitle(String episodeTitle) {
        this.episodeTitle = episodeTitle;
    }

    public String getLinkEmbed() {
        return linkEmbed;
    }

    public void setLinkEmbed(String linkEmbed) {
        this.linkEmbed = linkEmbed;
    }

    public String getLinkM3u8() {
        return linkM3u8;
    }

    public void setLinkM3u8(String linkM3u8) {
        this.linkM3u8 = linkM3u8;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

}