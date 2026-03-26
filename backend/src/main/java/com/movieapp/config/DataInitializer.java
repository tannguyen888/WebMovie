package com.movieapp.config;

import com.movieapp.model.Episode;
import com.movieapp.model.Genre;
import com.movieapp.model.Movie;
import com.movieapp.repository.GenreRepository;
import com.movieapp.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        private static final String[] ADJECTIVES = {
                        "Midnight",
                        "Crimson",
                        "Silver",
                        "Neon",
                        "Ancient",
                        "Phantom",
                        "Radiant",
                        "Silent",
                        "Hidden",
                        "Golden",
                        "Electric",
                        "Fallen",
                        "Velvet",
                        "Wild",
                        "Endless"
        };

        private static final String[] NOUNS = {
                        "Echo",
                        "Legacy",
                        "Odyssey",
                        "Destiny",
                        "Frontier",
                        "Horizon",
                        "Empire",
                        "Pulse",
                        "Storm",
                        "Memory",
                        "Reverie",
                        "Voyage",
                        "Mirage",
                        "Riddle",
                        "Bloom",
                        "Saga",
                        "Rising",
                        "Chorus",
                        "Labyrinth",
                        "Quest"
        };

        private static final String[] GENRES = {
                        "Action",
                        "Drama",
                        "Sci-Fi",
                        "Thriller",
                        "Fantasy",
                        "Mystery",
                        "Adventure",
                        "Romance"
        };

        private static final String[] TAGLINES = {
                        "đầy kịch tính và bất ngờ",
                        "tràn ngập cảm xúc",
                        "chan chứa hy vọng",
                        "với âm mưu chồng chất",
                        "giữa thế giới hỗn loạn",
                        "với nhịp độ nghẹt thở",
                        "giữa những lựa chọn khó khăn",
                        "khi ánh sáng và bóng tối giao thoa"
        };

        private static final String[] POSTERS = {
                        "/gPbM0MK8CP8A174rmUwGsADNYKD.jpg",
                        "/uHmvk8FnoxpgujDU0RIXLkv2fNt.jpg",
                        "/3CxUndGhUcZdt1Zggjdb2HkLLQX.jpg",
                        "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
                        "/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg",
                        "/5P8SmMzSNYikXpxil6BYzJ16611.jpg",
                        "/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg",
                        "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg",
                        "/6KErczPBROQty7QoIsaa6wJYXZi.jpg",
                        "/dU4HfnTEJDf9KvxGS9hgO7BVeju.jpg"
        };

        private final MovieRepository movieRepository;
        private final GenreRepository genreRepository;

        public DataInitializer(MovieRepository movieRepository, GenreRepository genreRepository) {
                this.movieRepository = movieRepository;
                this.genreRepository = genreRepository;
        }

        @Override
        public void run(String... args) throws Exception {
                if (movieRepository.count() > 0) {
                        System.out.println(
                                        "✅ Database already initialized with " + movieRepository.count() + " movies");
                        return;
                }

                System.out.println("📽️ Initializing database with sample movies...");

                Genre actionGenre = new Genre("Action");
                Genre romanceGenre = new Genre("Romance");
                Genre dramaGenre = new Genre("Drama");
                genreRepository.save(actionGenre);
                genreRepository.save(romanceGenre);
                genreRepository.save(dramaGenre);

                Movie movie1 = new Movie(
                                "Cái Tên Ẩn Danh",
                                "Action, Romance",
                                "Một bộ phim tình cảm hành động kịch tính với những cảnh quay ngoạn mục.",
                                fullPoster(0),
                                "2024",
                                8);
                movie1.setType("movie");
                movie1.setRating(92);
                movie1.setEmbedUrl("https://vip.opstream90.com/embed/hidden-name");

                List<Episode> episodes1 = new ArrayList<>();
                episodes1.add(new Episode(
                                "Tập 1 - Khởi đầu",
                                "https://vip.opstream90.com/share/93b5129e24b9c92e5b8e7115056b46bd",
                                "https://vip.opstream90.com/20260319/27526_93b5129e/index.m3u8",
                                movie1));
                episodes1.add(new Episode(
                                "Tập 2 - Phát triển",
                                "https://vip.opstream90.com/share/93b5129e24b9c92e5b8e7115056b46bd",
                                "https://vip.opstream90.com/20260319/27526_93b5129e/index.m3u8",
                                movie1));
                movie1.setEpisodes(episodes1);
                movieRepository.save(movie1);

                Movie movie2 = new Movie(
                                "Anh Yêu Em Sâu Đậm",
                                "Romance, Drama",
                                "Câu chuyện tình yêu đong đầy với những bất ngờ không ngờ tới.",
                                fullPoster(1),
                                "2024",
                                7);
                movie2.setType("tv");
                movie2.setRating(88);
                movie2.setEpisode(12);
                movie2.setEmbedUrl("https://vip.opstream10.com/embed/romance-forever");

                List<Episode> episodes2 = new ArrayList<>();
                episodes2.add(new Episode(
                                "Tập 1",
                                "https://vip.opstream10.com/share/2e41cf896aeb42ae117dbaff02e5f7c7",
                                "https://vip.opstream10.com/20260320/33091_2e41cf89/index.m3u8",
                                movie2));
                movie2.setEpisodes(episodes2);
                movieRepository.save(movie2);

                Movie movie3 = new Movie(
                                "Giai Thoại Phương Bắc",
                                "Action, Drama",
                                "Một tác phẩm điện ảnh huyền thoại với tầm nhìn rộng lớn.",
                                fullPoster(2),
                                "2023",
                                9);
                movie3.setType("movie");
                movie3.setRating(95);
                movie3.setEmbedUrl("https://vip.opstream90.com/embed/northern-legend");

                List<Episode> episodes3 = new ArrayList<>();
                episodes3.add(new Episode(
                                "Fullmovie",
                                "https://vip.opstream90.com/share/93b5129e24b9c92e5b8e7115056b46bd",
                                "https://vip.opstream90.com/20260319/27526_93b5129e/index.m3u8",
                                movie3));
                movie3.setEpisodes(episodes3);
                movieRepository.save(movie3);

                List<Movie> bulkMovies = buildBulkMovies(100);
                movieRepository.saveAll(bulkMovies);

                System.out.println("✅ Database initialized successfully with " + movieRepository.count() + " movies!");
        }

        private static String fullPoster(int index) {
                return "https://image.tmdb.org/t/p/w500" + POSTERS[index % POSTERS.length];
        }

        private List<Movie> buildBulkMovies(int target) {
                List<Movie> movies = new ArrayList<>();
                for (int i = 0; i < target; i++) {
                        String adjective = ADJECTIVES[i % ADJECTIVES.length];
                        String noun = NOUNS[i % NOUNS.length];
                        String genre = GENRES[i % GENRES.length];
                        String tagline = TAGLINES[i % TAGLINES.length];
                        String type = (i % 3 == 0) ? "tv" : "movie";

                        String title = (adjective + " " + noun).trim();
                        String description = "Một câu chuyện " + genre.toLowerCase() + " " + tagline + ".";
                        String releaseYear = String.valueOf(2001 + (i % 24));
                        String poster = fullPoster(i);

                        Movie movie = new Movie(title, genre, description, poster, releaseYear, 1);
                        movie.setType(type);
                        movie.setRating(65 + (i % 30));
                        movie.setEmbedUrl("https://cdn.movies.local/embed/" + (i + 10));
                        movie.setEpisode(type.equals("tv") ? 12 : 1);
                        movie.setStreamSources("[{\"label\":\"HD\",\"url\":\"https://cdn.movies.local/stream/"
                                        + (i + 10) + "\"}]");

                        movies.add(movie);
                }
                return movies;
        }
}