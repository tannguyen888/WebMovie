import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import IconPlay from "/assets/play-button.png";
import IconRating from "/assets/rating.png";

const IMG_BASE = import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [hero, setHero] = useState(null);
  const [heroSource, setHeroSource] = useState("backend");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const buildImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${IMG_BASE}${path}`;
  };

  const backdropUrl = useMemo(() => {
    const path = hero?.backdropPath || hero?.backdrop_path || hero?.posterPath || hero?.poster_path;
    return buildImageUrl(path) || "/assets/banner.jpg";
  }, [hero]);

  const posterUrl = useMemo(() => {
    const path = hero?.posterPath || hero?.poster_path;
    return buildImageUrl(path) || "/assets/poster.jpg";
  }, [hero]);

  useEffect(() => {
    const controller = new AbortController();
    const tmdbController = new AbortController();

    const fetchTmdbHero = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?language=vi", {
          signal: tmdbController.signal,
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
          setHeroSource("tmdb");
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Banner fetch error", err);
        setError("Không tải được poster, dùng ảnh dự phòng.");
      }
    };

    const fetchBackendHero = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/movies", { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Backend error ${res.status}`);
        }
        const payload = await res.json();
        const list = Array.isArray(payload)
          ? payload
          : payload?.content?.movies || payload?.content || [];
        if (list.length) {
          const randomMovie = list[Math.floor(Math.random() * list.length)];
          setHero(randomMovie);
          setHeroSource("backend");
          return;
        }
        throw new Error("Empty movie list");
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error("Backend banner error", err);
        setError("Không tải được dữ liệu backend, hiển thị phim thịnh hành.");
        fetchTmdbHero();
      }
    };

    fetchBackendHero();
    return () => {
      controller.abort();
      tmdbController.abort();
    };
  }, []);

  const ratingSource = hero?.rating ?? hero?.vote_average ?? hero?.voteAverage;
  const rating = ratingSource ? Math.round(Number(ratingSource) * 10) / 10 : null;

  const heroTitle = hero?.title || hero?.name || "Đang tải...";
  const heroOverview = hero?.overview || hero?.description || "Khám phá những bộ phim thịnh hành hôm nay.";
  const heroType = hero?.media_type === "tv" ? "TV Show" : "Movie";

  const goToHeroDestination = () => {
    if (heroSource === "backend" && hero?.id) {
      navigate(`/movie/${hero.id}`);
    } else {
      navigate("/movies");
    }
  };

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
              {heroType}
            </span>

            <h1 className="text-4xl font-bold text-white">
              {heroTitle}
            </h1>

            <div className="flex items-center space-x-2 text-white">
              <img src={IconRating} className="w-6 h-6" />
              <span className="text-lg font-semibold">{rating ?? "--"}</span>
              <span className="text-sm text-gray-200">/ 10 TMDB</span>
            </div>

            <p className="text-white max-w-xl leading-relaxed overflow-hidden">
              {heroOverview}
            </p>

            {error && <p className="text-sm text-red-200">{error}</p>}

            <div className="flex items-center space-x-4">
              <button
                className="px-5 py-2 bg-black/70 text-white border border-white"
                onClick={goToHeroDestination}
              >
                Chi tiết
              </button>
              <button
                className="px-5 py-2 bg-red-600 text-white font-bold"
                onClick={goToHeroDestination}
              >
                Xem phim
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div
              className="w-[260px] h-[380px] relative group rounded-lg overflow-hidden shadow-xl bg-black/40 cursor-pointer"
              onClick={goToHeroDestination}
            >
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
