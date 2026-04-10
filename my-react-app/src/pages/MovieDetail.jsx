import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/axios";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/movies/${id}`);
        // backend wraps in { success, content }
        const data = res.data?.content || res.data;
        setMovie(data);
      } catch (err) {
        console.error("Movie detail error", err);
        setError("Không tải được thông tin phim.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="p-10 text-white">Đang tải...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!movie) return <div className="p-10 text-white">Không tìm thấy phim.</div>;

  const firstEpisode = movie.episodes?.[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <img
            src={movie.posterPath || "/assets/poster.jpg"}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="mt-4 flex flex-col gap-3">
            {firstEpisode?.linkEmbed && (
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                onClick={() => window.open(firstEpisode.linkEmbed, "_blank")}
              >
                Xem phim
              </button>
            )}
            {firstEpisode?.linkM3u8 && (
              <button
                className="bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded"
                onClick={() => window.open(firstEpisode.linkM3u8, "_blank")}
              >
                Xem trailer
              </button>
            )}
            <button
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">{movie.description}</p>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>Thể loại: {movie.genre || "N/A"}</span>
            <span>Năm: {movie.releaseYear || "N/A"}</span>
            <span>Đánh giá: {movie.rating || "N/A"}</span>
          </div>
          {movie.episodes?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Tập phim</h3>
              <ul className="space-y-2">
                {movie.episodes.map((ep) => (
                  <li key={ep.id} className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded">
                    <span>{ep.episodeTitle}</span>
                    <div className="space-x-2">
                      {ep.linkEmbed && (
                        <button
                          className="text-sm bg-red-600 px-3 py-1 rounded"
                          onClick={() => window.open(ep.linkEmbed, "_blank")}
                        >
                          Xem
                        </button>
                      )}
                      {ep.linkM3u8 && (
                        <button
                          className="text-sm bg-gray-700 px-3 py-1 rounded"
                          onClick={() => window.open(ep.linkM3u8, "_blank")}
                        >
                          Trailer
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
