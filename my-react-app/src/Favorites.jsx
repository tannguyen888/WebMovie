import { useState, useEffect } from "react";
import { backendApi } from "./api/axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      backendApi.get("/api/favorites")
        .then(res => {
          setFavorites(res.data);
        }).catch(err => console.error("Error fetching favorites:", err));
    }
  }, []);

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
    <div className="px-6">
      <h2 className="text-xl font-bold mb-4">My Favorites</h2>
      <div className="flex flex-wrap gap-6">
        {favorites.map((fav) => (
          <div
            key={fav.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${fav.posterPath})`,
            }}
          >
            <button
              className="absolute top-2 right-2 z-10 text-red-500 text-2xl"
              onClick={() => removeFavorite(fav.movieId)}
            >
              ❤️
            </button>
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0" />
            <div className="relative p-4 flex items-end justify-center h-full text-center">
              <h3 className="text-sm uppercase font-semibold">
                {fav.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;