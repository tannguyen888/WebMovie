import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:8080/api";
const FALLBACK_POSTER = "";

export default function MoviePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/movies/${id}`);
        if (!res.ok) throw new Error("Movie not found");
        const data = await res.json();
        const movieData = data?.content || data;
        
        setMovie(movieData);
        
        // Parse sources
        let parsedSources = [];
        try {
          if (movieData.streamSources) {
            parsedSources = JSON.parse(movieData.streamSources);
          }
        } catch (e) {
          console.error("Error parsing sources:", e);
        }
        
        // If no sources, create from embedUrl
        if (parsedSources.length === 0 && movieData.embedUrl) {
          parsedSources = [{ name: "VidSrc", url: movieData.embedUrl }];
        }
        
        setSources(parsedSources);
        if (parsedSources.length > 0) {
          setSelectedSource(parsedSources[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  const posterUrl = (movie) =>
    movie?.posterPath || movie?.poster_url || movie?.thumb_url || FALLBACK_POSTER;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p className="text-2xl">Đang tải...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <p className="text-2xl mb-4">Lỗi: {error || "Không tìm thấy phim"}</p>
        <button
          onClick={() => navigate("/movies")}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 p-4">
        <button
          onClick={() => navigate("/movies")}
          className="flex items-center gap-2 text-lg hover:text-red-500 transition"
        >
          ← Quay lại
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Info (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={posterUrl(movie)}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg mb-4"
              />
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">
                {movie.releaseYear} • {movie.genre}
              </p>
              <p className="text-yellow-500 mb-4">⭐ {movie.rating}/100</p>
              <p className="text-gray-300 mb-6">{movie.description}</p>

              {/* Source Buttons */}
              {sources.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-3">Chọn nguồn phát:</h3>
                  <div className="space-y-2">
                    {sources.map((source, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSource(source)}
                        className={`w-full p-3 rounded transition ${
                          selectedSource?.url === source.url
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {source.name || `Nguồn ${idx + 1}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Open in New Tab */}
              {selectedSource && (
                <button
                  onClick={() => window.open(selectedSource.url, "_blank")}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded text-lg transition"
                >
                  📺 Mở ở tab khác
                </button>
              )}
            </div>
          </div>

          {/* Video Player */}
          <div className="lg:col-span-2">
            {selectedSource ? (
              <div className="bg-black rounded-lg overflow-hidden">
                <div className="aspect-video relative bg-black flex items-center justify-center">
                  <iframe
                    key={selectedSource.url}
                    src={selectedSource.url}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                    style={{ display: "block" }}
                    title="Video Player"
                    onError={() => console.log("Iframe error")}
                  />
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 hover:opacity-100 transition">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-4">⏳ Đang tải...</p>
                      <p className="text-sm">Chọn "Mở ở tab khác" nếu video không phát</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                <p>Không có nguồn phát</p>
              </div>
            )}

            {/* Movie Details */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Thông tin phim</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Năm phát hành</p>
                  <p className="text-lg">{movie.releaseYear}</p>
                </div>
                <div>
                  <p className="text-gray-400">Đánh giá</p>
                  <p className="text-lg">{movie.rating}/100</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Thể loại</p>
                  <p className="text-lg">{movie.genre}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400">Mô tả</p>
                  <p className="text-lg">{movie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
