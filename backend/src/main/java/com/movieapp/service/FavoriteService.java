package com.movieapp.service;

import com.movieapp.model.Favorite;
import com.movieapp.model.User;
import com.movieapp.repository.FavoriteRepository;
import com.movieapp.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;

    public FavoriteService(FavoriteRepository favoriteRepository) {
        this.favoriteRepository = favoriteRepository;
    }

    public List<Favorite> getFavoritesByUser(User user) {
        return favoriteRepository.findByUser(user);
    }

    public Favorite addFavorite(User user, String movieId, String title, String posterPath) {
        // Check if already exists
        if (favoriteRepository.existsByUserAndMovieId(user, movieId)) {
            throw new RuntimeException("This movie is already in your favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setMovieId(movieId);
        favorite.setTitle(title);
        favorite.setPosterPath(posterPath);
        return favoriteRepository.save(favorite);
    }

    public void removeFavorite(User user, String movieId) {
        Favorite favorite = favoriteRepository.findByUserAndMovieId(user, movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found"));
        favoriteRepository.deleteByUserAndMovieId(user, movieId);
    }

    public boolean isFavorite(User user, String movieId) {
        return favoriteRepository.existsByUserAndMovieId(user, movieId);
    }

    public long countFavorites(User user) {
        return favoriteRepository.countByUser(user);
    }

    public Favorite getFavoriteById(Long id) {
        return favoriteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found with id: " + id));
    }
}
