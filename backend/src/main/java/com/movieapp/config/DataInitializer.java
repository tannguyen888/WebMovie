package com.movieapp.config;

import com.movieapp.model.Episode;
import com.movieapp.model.Movie;
import com.movieapp.repository.MovieRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

        private final MovieRepository movieRepository;

        public DataInitializer(MovieRepository movieRepository) {
                this.movieRepository = movieRepository;
        }

    @Override
    public void run(String... args) throws Exception {
        // Kiểm tra nếu cơ sở dữ liệu đã có dữ liệu
        if (movieRepository.count() > 0) {
            System.out.println("Database already initialized with " + movieRepository.count() + " movies");
            return;
        }

        // Tạo Movie t1
        Movie t1 = new Movie();
        t1.setTitle("Cái Tên Ẩn Danh");
        t1.setDescription("Một cái tên tùy tiện...")
                .setGenre("Hành động")
                .setReleaseYear("2026")
                .setPosterPath("/assets/cai-ten-an-danh.jpg")
                .setType("tv")
                .setRating(8);

        // Tạo danh sách các tập phim cho Movie t1
        List<Movie.Episode> episodes = new ArrayList<>();
        Episode ep1 = new Episode("Tập 1",
                "https://vip.opstream90.com/share/93b5129e24b9c92e5b8e7115056b46bd",
                "https://vip.opstream90.com/20260319/27526_93b5129e/index.m3u8", t1);
        episodes.add(ep1);

        Episode ep2 = new Episode("Tập 2",
                "https://vip.opstream90.com/share/93b5129e24b9c92e5b8e7115056b46bd",
                "https://vip.opstream90.com/20260319/27526_93b5129e/index.m3u8", t1);
        episodes.add(ep2);

        t1.setEpisodes(episodes); // Gán danh sách tập vào movie

        // Lưu movie t1 vào database
        movieRepository.save(t1);

        // Tạo Movie t2
        Movie t2 = new Movie();
        t2.setTitle("Anh Yêu Em Sâu Đậm");
        t2.setDescription(
                "Nhiều năm sau khi một hiểu lầm kết thúc mối tình thời thanh xuân, " +
                        "Phương Hân Nghiên và Giang Hải Dương tình cờ tái ngộ với tư cách đồng nghiệp " +
                        "và quyết định gác lại quá khứ để làm việc cùng nhau. Sau cái chết của chồng Phương Hân Nghiên, "
                        
                        "Giang Hải Dương đã luôn ở bên hỗ trợ cô vượt qua nỗi đau và cùng chăm sóc gia đình cô. " +
                        "Khi hành động sai lầm của một đồng nghiệp đẩy nhà máy vào cuộc khủng hoảng trầm trọng, " +
                        "cả hai đã hợp sức để khôi phục sự ổn định và giúp người đó tìm lại sự chuộc lỗi.")
                .setGenre("Tình cảm")
                .setReleaseYear("2026")
                .setPosterPath("/assets/anh-yeu-em-sau-dam.jpg");

        // Lưu movie t2 vào database
        movieRepository.save(t2);

        System.out.println("Database initialized with " + movieRepository.count() + " movies!");
    }
}