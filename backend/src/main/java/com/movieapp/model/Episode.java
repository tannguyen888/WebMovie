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

    @Column(nullable = false)
    private String title;

    private String description;

    private String type;

    @Column(nullable = false)
    private int episodeNumber;

    public Episode(String title, String description, String type, int episodeNumber) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.episodeNumber = episodeNumber;
    }
}
