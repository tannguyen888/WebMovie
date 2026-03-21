// import { useState, useEffect, useContext } from "react";
// import { MovieContext } from "./MovieContext.jsx";
// import { backendApi } from "./api/axios";

// const FALLBACK_POSTER = "/assets/poster.jpg";
// const API_BASE = "http://localhost:8080/api";

// export default function UserDash() {
//   const { handleVideoTrailer } = useContext(MovieContext);

//   const [movies, setMovies] = useState([]);
//   const [filteredMovies, setFilteredMovies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("movie");
//   const [loading, setLoading] = useState(false);
//   const [favorites, setFavorites] = useState(new Set());
//   const [favLoading, setFavLoading] = useState(null);

//   // Modal & Episodes
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [episodes, setEpisodes] = useState([]);
//   const [episodesLoading, setEpisodesLoading] = useState(false);
//   const [selectedEmbedUrl, setSelectedEmbedUrl] = useState(null);

//   // =========================
//   // Parse embed sources from selected movie
//   // =========================
//   useEffect(() => {
//     if (!selectedMovie?.id) {
//       setEpisodes([]);
//       return;
//     }

//     try {
//       const embedUrl = selectedMovie?.embedUrl;
//       const streamSourcesStr = selectedMovie?.streamSources;
      
//       let sources = [];
      
//       // Try to parse streamSources JSON
//       if (streamSourcesStr) {
//         try {
//           sources = JSON.parse(streamSourcesStr);
//         } catch (e) {
//           console.error("Error parsing streamSources:", e);
//         }
//       }
      
//       // If no sources but have embedUrl, create default source
//       if (sources.length === 0 && embedUrl) {
//         sources = [{ name: "VidSrc", url: embedUrl }];
//       }
      
//       setEpisodes(sources);
//     } catch (err) {
//       console.error("Parse sources error:", err);
//       setEpisodes([]);
//     }
//   }, [selectedMovie]);

//   // =========================
//   // Fetch movies
//   // =========================
//   useEffect(() => {
//     const fetchMovies = async () => {
//       setLoading(true);
//       try {
//         const endpoint = type === 'movie' ? '/movies/popular' : '/tv/popular';
//         const res = await fetch(`${API_BASE}${endpoint}`);
//         const data = await res.json();
//         const items = type === 'movie' ? (data?.content?.movies || []) : (data?.content?.tv || []);

//         setMovies(items);
//         setFilteredMovies(items);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [type]);

//   // =========================
//   // Fetch favorites
//   // =========================
//   useEffect(() => {
//     const fetchFavorites = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       try {
//         const res = await backendApi.get("/api/favorites");
//         const favSet = new Set(res.data.map((f) => f.movieId.toString()));
//         setFavorites(favSet);
//       } catch (err) {
//         console.error("Favorites error:", err);
//       }
//     };

//     fetchFavorites();
//   }, []);

//   // =========================
//   // Search (debounce)
//   // =========================
// //   useEffect(() => {
//     const timeout = setTimeout(() => {
//       if (!search) {
//         setFilteredMovies(movies);
//       } else {
//         const filtered = movies.filter((m) =>
//           (m.name || m.title || "")
//             .toLowerCase()
//             .includes(search.toLowerCase())
//         );
//         setFilteredMovies(filtered);
//       }
//     }, 300);

//     return () => clearTimeout(timeout);
//   }, [search, movies]);

//   // =========================
//   // Helpers
//   // =========================
//   const posterUrl = (movie) =>
//     movie?.posterPath || movie?.poster_url || movie?.thumb_url || FALLBACK_POSTER;

//   const movieId = (movie) => movie?.id;

//   // =========================
//   // Toggle favorite
//   // =========================
//   const toggleFavorite = async (movie) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("Đăng nhập để thêm yêu thích");
//       return;
//     }

//     const id = movieId(movie)?.toString();
//     if (!id) return;

//     const isFav = favorites.has(id);
//     setFavLoading(id);

//     try {
//       if (isFav) {
//         await backendApi.delete("/api/favorites", {
//           params: { movieId: id },
//         });

//         setFavorites((prev) => {
//           const newSet = new Set(prev);
//           newSet.delete(id);
//           return newSet;
//         });
//       } else {
//         await backendApi.post("/api/favorites", null, {
//           params: {
//             movieId: id,
//             title: movie.name || movie.title,
//             posterPath: movie.poster_url || movie.thumb_url,
//           },
//         });

//         setFavorites((prev) => {
//           const newSet = new Set(prev);
//           newSet.add(id);
//           return newSet;
//         });
//       }
//     } catch (err) {
//       console.error("Toggle favorite error:", err);
//     } finally {
//       setFavLoading(null);
//     }
//   };

//   // =========================
//   // Render
//   // =========================
//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-4xl font-bold mb-6">Danh Sách Phim</h1>

//       {/* Filters */}
//       <div className="mb-6 flex gap-4 flex-wrap">
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="px-4 py-2 bg-gray-800 rounded text-white"
//         >
//           <option value="movie">Phim Lẻ</option>
//           <option value="tv">Phim Bộ</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Tìm kiếm..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 bg-gray-800 rounded text-white flex-1 max-w-md"
//         />
//       </div>

//       {/* Loading */}
//       {loading && <p className="text-center text-lg">Đang tải...</p>}

//       {/* Movie grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {filteredMovies.map((movie) => {
//           const id = movieId(movie)?.toString();

//           return (
//             <div
//               key={id || Math.random()}
//               className="bg-gray-800 rounded overflow-hidden group cursor-pointer hover:scale-105 transition"
//             >
//               {/* Poster */}
//               <div className="relative w-full aspect-[2/3] overflow-hidden bg-gray-700">
//                 <img
//                   src={posterUrl(movie)}
//                   alt={movie.name || movie.title}
//                   loading="lazy"
//                   className="w-full h-full object-cover group-hover:brightness-75"
//                 />

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
//                   <button
//                     onClick={() => setSelectedMovie(movie)}
//                     className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
//                   >
//                     Xem
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleFavorite(movie);
//                     }}
//                     disabled={favLoading === id}
//                     className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
//                   >
//                     {favLoading === id
//                       ? "..."
//                       : favorites.has(id)
//                       ? "❤️"
//                       : "🤍"}
//                   </button>
//                 </div>
//               </div>

//               {/* Info */}
//               <div className="p-3">
//                 <h3 className="font-semibold truncate text-sm">
//                   {movie.title || movie.name}
//                 </h3>

//                 <p className="text-xs text-gray-400">
//                   {movie.releaseYear || movie.year || ""}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Empty */}
//       {filteredMovies.length === 0 && !loading && (
//         <p className="text-center text-gray-400 mt-10">
//           Không tìm thấy phim
//         </p>
//       )}

//       {/* Embed Modal */}
//       {selectedEmbedUrl && (
//         <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//           <div className="relative w-full h-full flex flex-col">
//             <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700 z-10">
//               <h3 className="text-white font-bold">Phát Video</h3>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => window.open(selectedEmbedUrl, '_blank')}
//                   className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
//                 >
//                   📺 Mở ở tab khác
//                 </button>
//                 <button
//                   onClick={() => setSelectedEmbedUrl(null)}
//                   className="text-white text-2xl font-bold hover:text-red-600"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//             <div className="flex-1 relative bg-black flex items-center justify-center">
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/40 to-black/60 text-white text-center p-6 z-20 pointer-events-none">
//                 <p className="text-2xl font-bold mb-2">⏳ Đang tải video...</p>
//                 <p className="text-sm text-gray-300 mb-4">Nếu video không phát sau 5 giây, bấm "📺 Mở ở tab khác"</p>
//               </div>
//               <iframe
//                 src={selectedEmbedUrl}
//                 width="100%"
//                 height="100%"
//                 frameBorder="0"
//                 allowFullScreen={true}
//                 allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
//                 sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
//                 style={{ display: 'block', border: 'none' }}
//                 title="Video Player"
//                 onLoad={() => console.log("Iframe loaded")}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal Episodes */}
//       {selectedMovie && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//           <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
//             {/* Header */}
//             <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-gray-800">
//               <div>
//                 <h2 className="text-2xl font-bold">{selectedMovie.title || selectedMovie.name}</h2>
//                 <p className="text-gray-400 text-sm">{episodes.length} nguồn phát</p>
//               </div>
//               <button
//                 onClick={() => setSelectedMovie(null)}
//                 className="text-2xl font-bold hover:text-red-500"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Episodes list */}
//             <div className="p-6">
//               {episodesLoading ? (
//                 <p className="text-center">Đang tải...</p>
//               ) : episodes.length === 0 ? (
//                 <p className="text-center text-gray-400">Không có nguồn phát nào</p>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                   {episodes.map((ep, idx) => (
//                     <button
//                       key={idx}
//                       onClick={() => setSelectedEmbedUrl(ep.url)}
//                       className="p-4 bg-gray-700 hover:bg-gray-600 rounded text-center transition"
//                     >
//                       <p className="font-semibold text-sm">{ep.name || `Nguồn ${idx + 1}`}</p>
//                       <p className="text-xs text-gray-400 truncate">{ep.url ? '✓ Khả dụng' : 'Không'}</p>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
