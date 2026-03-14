import React from "react";

import IconPlay from "/src/assets/play-button.png";
import IconRating from "/src/assets/rating.png";
import IconRatingHalf from "/src/assets/rating-half.png";

const Banner = () => {
  return (
    <div>
      {/* TOP BAR */}
      <div className="bg-yellow-300 text-center p-4">
        <h2 className="text-2xl font-semibold">
          Welcome to the Movie MoiDen!
        </h2>
        <p className="mt-2">
          Discover and explore your favorite movies.
        </p>
      </div>

      {/* BANNER */}
      <div className="w-full min-h-[700px] bg-banner bg-cover bg-center bg-no-repeat relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col space-y-6">
            <span className="w-fit bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2">
              TV Show
            </span>

            <h1 className="text-4xl font-bold text-white">
              Mưa Đỏ
            </h1>

            <div className="flex items-center space-x-2">
              <img src={IconRating} className="w-6 h-6" />
              <img src={IconRating} className="w-6 h-6" />
              <img src={IconRating} className="w-6 h-6" />
              <img src={IconRating} className="w-6 h-6" />
              <img src={IconRatingHalf} className="w-6 h-6" />
            </div>

            <p className="text-white max-w-lg">
             “Mưa đỏ” là phim truyện điện ảnh về đề tài chiến tranh cách mạng với kịch bản của nhà văn Chu Lai. 
             Phim lấy cảm hứng và hư cấu từ sự kiện 81 ngày đêm năm 1972 khi nhân dân, cán bộ và các chiến sĩ đã anh dũng, 
             kiên cường chiến đấu bảo vệ Thành cổ Quảng Trị. 
             Đến nay, 81 ngày đêm ấy đã thành huyền thoại, 
             là dấu mốc lịch sử minh chứng cho khát vọng thống nhất của dân tộc ta trong cuộc kháng chiến chống Mỹ cứu nước. 
             Trận chiến khốc liệt 81 ngày đêm bảo vệ Thành cổ Quảng Trị đã góp phần quan trọng vào thắng lợi trên bàn đàm phán Hội nghị Paris, mở đường cho đại thắng mùa Xuân năm 1975, giải phóng miền Nam, thống nhất đất nước. Ra mắt giữa bối cảnh cả nước đang hướng về
             một trong những cột mốc lịch sử trọng đại nhất, “Mưa đỏ” mang tinh thần của nhịp cầu kết nối giữa quá khứ và hiện tại, 
             kể lại trang sử của mùa hè rực lửa đã khắc sâu vào lịch sử dân tộc.
            </p>

            <div className="flex items-center space-x-4">
              <button className="px-5 py-2 bg-black text-white border border-white">
                Chi tiết
              </button>
              <button className="px-5 py-2 bg-red-600 text-white font-bold">
                Xem phim
              </button>
            </div>
          </div>

          {/* RIGHT POSTER */}
          <div className="flex justify-center md:justify-end">
            <div className="w-[260px] h-[380px] relative group rounded-lg overflow-hidden shadow-xl">
              
              {/* Play button */}
              <button className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                <img src={IconPlay} className="w-16 h-16" />
              </button>

              {/* Poster */}
          <iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/cu0JFCxqXzc?start=49"
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
