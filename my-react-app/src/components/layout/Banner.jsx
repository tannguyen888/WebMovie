import { useEffect, useMemo, useState } from "react";

import IconPlay from "/assets/play-button.png";
import IconRating from "/assets/rating.png";
import IconRatingHalf from "/assets/rating-half.png";

const IMG_BASE = import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [hero, setHero] = useState(null);
  const [error, setError] = useState("");

  const backdropUrl = useMemo(() => {
    if (!hero?.backdrop_path) return "/assets/banner.jpg";
    return `${IMG_BASE}${hero.backdrop_path}`;
  }, [hero]);

  const posterUrl = useMemo(() => {
    if (!hero?.poster_path) return "/assets/poster.jpg";
    return `${IMG_BASE}${hero.poster_path}`;
  }, [hero]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchHero = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=vi", {
          signal: controller.signal,
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (!res.ok) {
          throw new Error(`TMDB error ${res.status}`);
        }

        const data = await res.json();
        if (data?.results?.length) {
          setHero(data.results[0]);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Banner fetch error", err);
        setError("Không tải được poster, dùng ảnh dự phòng.");
      }
    };

    fetchHero();
    return () => controller.abort();
  }, []);

  const rating = hero?.vote_average ? (Math.round(hero.vote_average * 10) / 10) : null;

  return (
    <div>
      <div className="bg-yellow-300 text-center p-4">
        <h2 className="text-2xl font-semibold">Welcome to the Movie MoiDen!</h2>
        <p className="mt-2">Discover and explore your favorite movies.</p>
      </div>

      <div
        className="w-full min-h-[700px] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col space-y-6">
            <span className="w-fit bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2">
              {hero?.media_type === "tv" ? "TV Show" : "Movie"}
            </span>

            <h1 className="text-4xl font-bold text-white">
              {hero?.title || hero?.name || "Đang tải..."}
            </h1>

            <div className="flex items-center space-x-2 text-white">
              <img src={IconRating} className="w-6 h-6" />
              <span className="text-lg font-semibold">{rating ?? "--"}</span>
              <span className="text-sm text-gray-200">/ 10 TMDB</span>
            </div>

            <p className="text-white max-w-xl leading-relaxed overflow-hidden">
              {hero?.overview || "Khám phá những bộ phim thịnh hành hôm nay."}
            </p>

            {error && <p className="text-sm text-red-200">{error}</p>}

            <div className="flex items-center space-x-4">
              <button className="px-5 py-2 bg-black/70 text-white border border-white">
                Chi tiết
              </button>
              <button className="px-5 py-2 bg-red-600 text-white font-bold">
                Xem phim
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-[260px] h-[380px] relative group rounded-lg overflow-hidden shadow-xl bg-black/40">
              <button className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300">
                <img src={IconPlay} className="w-16 h-16" />
              </button>

              <img
                src={posterUrl}
                alt={hero?.title || hero?.name || "Poster"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
