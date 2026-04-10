import { useEffect, useState } from "react";
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

const TVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await api.get("/tv/popular");
        const items = response.data?.content?.tv || [];
        setShows(items);
      } catch (err) {
        console.error("Failed to fetch tv shows", err);
        setError("Không thể tải danh sách TV Shows.");
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  if (loading) {
    return <div className="p-10 text-white">Đang tải TV Shows...</div>;
  }

  if (error) {
    return <div className="p-10 text-white">{error}</div>;
  }

  return (
    <section className="px-6 py-8">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl font-bold text-white uppercase">TV Shows</h2>
        <p className="text-gray-300">Tổng cộng {shows.length} chương trình</p>
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {shows.map((show) => (
          <article
            key={show.id}
            className="relative h-[280px] rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            onClick={() => navigate(`/movie/${show.id}`)}
          >
            <img
             src={show.posterPath || "/placeholder.jpg"}
              alt={show.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <h3 className="text-white font-semibold text-sm line-clamp-2">{show.title}</h3>
              <p className="text-gray-300 text-xs mt-1">Đánh giá:{show.rating}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TVShows;
