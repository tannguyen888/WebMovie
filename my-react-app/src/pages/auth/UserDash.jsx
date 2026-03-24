import { useState, useEffect } from "react";
import { backendApi } from "../api/axios.js";
import Banner from "../baser/Banner.jsx";

const UserDash = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      backendApi.get("/api/favorites")
        .then(res => {
          setFavorites(res.data);
        })
        .catch(err => {
          console.error("Error fetching favorites:", err);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  // Remove favorite
  const removeFavorite = async (movieId) => {
    try {
      await backendApi.delete("/api/favorites", {
        params: { movieId }
      });

      setFavorites(prev => prev.filter(f => f.movieId !== movieId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div>
      <Banner />

      <h1 className="text-xl font-bold mb-4">User Dashboard</h1>
      <p>Welcome to your dashboard!</p>

      <h2 className="text-lg font-semibold mb-4">Your Favorite Movies</h2>

      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {favorites.map((fav) => (
            <div
              key={fav.movieId}
              className="bg-cover bg-center w-[200px] h-[300px] relative rounded hover:scale-105 transition cursor-pointer"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${fav.posterPath})`,
              }}
            >
              {/* overlay */}
              <div className="absolute bottom-0 bg-black/60 w-full p-2">
                <h3 className="text-sm font-semibold truncate">
                  {fav.title}
                </h3>

                <button
                  onClick={() => removeFavorite(fav.movieId)}
                  className="text-red-500 mt-1"
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite movies yet.</p>
      )}
    </div>
  );
};

export default UserDash;