import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";
const FALLBACK_POSTER = "/assets/poster.jpg";
const TABS = [
  { id: "movie", label: "Phim lẻ" },
  { id: "tv", label: "Phim bộ" },
];

const TrendingTabs = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchTrending = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${API_BASE}/movies/trending`, {
          params: { type: activeTab, limit: 12 },
        });
        if (!cancelled) {
          setItems(res.data?.content?.movies || []);
        }
      } catch (err) {
        console.error("Trending fetch error:", err);
        if (!cancelled) {
          setError("Không tải được danh sách thịnh hành.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTrending();
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const posterFor = (movie) => movie?.posterPath || movie?.poster_path || FALLBACK_POSTER;
  const titleFor = (movie) => movie?.title || movie?.name || "Unnamed";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold uppercase text-white">Thịnh hành</h2>
        <div className="inline-flex rounded-full bg-white/10 p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
                activeTab === tab.id
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-400">{error}</div>}

      {loading ? (
        <div className="text-white/70">Đang tải danh sách thịnh hành...</div>
      ) : (
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {items.map((movie) => (
            <article
              key={movie.id}
              className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg hover:-translate-y-1 transition cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden">
                <img
                  src={posterFor(movie)}
                  alt={titleFor(movie)}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs uppercase tracking-wide bg-black/60 px-2 py-1 rounded">
                  {movie.type === "tv" ? "Series" : "Movie"}
                </span>
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-semibold text-white line-clamp-2">
                  {titleFor(movie)}
                </h3>
                <p className="text-xs text-gray-400">{movie.genre || "Đa thể loại"}</p>
                <p className="text-xs text-yellow-400 font-medium">
                  ⭐ {movie.rating ?? "--"} / 100
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TrendingTabs;
