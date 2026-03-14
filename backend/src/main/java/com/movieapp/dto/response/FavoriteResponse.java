package com.movieapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponse {
    private Long id;
    private String movieId;
    private String title;
    private String posterPath;
}
