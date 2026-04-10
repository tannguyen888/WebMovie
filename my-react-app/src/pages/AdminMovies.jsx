import { useState, useEffect, useCallback } from "react";
import api from "../config/axios";

const EMPTY_MOVIE = {
  title: "",
  genre: "",
  description: "",
  posterPath: "",
  releaseYear: "",
  type: "movie",
  rating: 0,
  embedUrl: "",
  episode: 1,
  streamSources: "",
};

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // movie object or null
  const [form, setForm] = useState({ ...EMPTY_MOVIE });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const perPage = 10;

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/movies");
      setMovies(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Không thể tải danh sách phim");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Filtered + paginated
  const filtered = movies.filter(
    (m) =>
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.genre?.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageMovies = filtered.slice((page - 1) * perPage, page * perPage);

  // Auto-dismiss messages
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const openCreate = () => {
    setEditing("new");
    setForm({ ...EMPTY_MOVIE });
    setError("");
  };

  const openEdit = (movie) => {
    setEditing(movie);
    setForm({
      title: movie.title || "",
      genre: movie.genre || "",
      description: movie.description || "",
      posterPath: movie.posterPath || "",
      releaseYear: movie.releaseYear || "",
      type: movie.type || "movie",
      rating: movie.rating || 0,
      embedUrl: movie.embedUrl || "",
      episode: movie.episode || 1,
      streamSources: movie.streamSources || "",
    });
    setError("");
  };

  const closeForm = () => {
    setEditing(null);
    setForm({ ...EMPTY_MOVIE });
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "rating" || name === "episode" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Tên phim không được để trống");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editing === "new") {
        await api.post("/movies", form);
        setSuccess("Thêm phim thành công!");
      } else {
        await api.put(`/movies/${editing.id}`, form);
        setSuccess("Cập nhật phim thành công!");
      }
      closeForm();
      fetchMovies();
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi lưu phim");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Xóa phim "${title}"?`)) return;
    try {
      await api.delete(`/movies/${id}`);
      setSuccess(`Đã xóa "${title}"`);
      fetchMovies();
    } catch {
      setError("Lỗi khi xóa phim");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">
          Quản lý Phim ({movies.length})
        </h1>
        <button
          onClick={openCreate}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition"
        >
          + Thêm phim mới
        </button>
      </div>

      {/* Messages */}
      {success && (
        <div className="bg-green-600/20 border border-green-500 text-green-300 px-4 py-2 rounded mb-4">
          {success}
        </div>
      )}
      {error && !editing && (
        <div className="bg-red-600/20 border border-red-500 text-red-300 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc thể loại..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full sm:w-80 bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded mb-6 focus:outline-none focus:border-blue-500"
      />

      {/* Modal Form */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              {editing === "new" ? "Thêm phim mới" : `Sửa: ${editing.title}`}
            </h2>
            {error && (
              <div className="bg-red-600/20 border border-red-500 text-red-300 px-3 py-2 rounded mb-4 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Tên phim *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Thể loại
                  </label>
                  <input
                    name="genre"
                    value={form.genre}
                    onChange={handleChange}
                    placeholder="Action, Drama, ..."
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Loại
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Năm phát hành
                  </label>
                  <input
                    name="releaseYear"
                    value={form.releaseYear}
                    onChange={handleChange}
                    placeholder="2024"
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Rating (0-100)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="100"
                    value={form.rating}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-1">
                    Số tập
                  </label>
                  <input
                    name="episode"
                    type="number"
                    min="1"
                    value={form.episode}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Poster URL
                </label>
                <input
                  name="posterPath"
                  value={form.posterPath}
                  onChange={handleChange}
                  placeholder="https://image.tmdb.org/t/p/w500/..."
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Embed URL
                </label>
                <input
                  name="embedUrl"
                  value={form.embedUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Stream Sources (JSON)
                </label>
                <textarea
                  name="streamSources"
                  value={form.streamSources}
                  onChange={handleChange}
                  rows="2"
                  placeholder='[{"label":"HD","url":"https://..."}]'
                  className="w-full bg-gray-800 border border-gray-600 text-white px-3 py-2 rounded focus:outline-none focus:border-blue-500 resize-none font-mono text-sm"
                />
              </div>

              {/* Preview poster */}
              {form.posterPath && (
                <div className="flex items-center gap-3">
                  <img
                    src={form.posterPath}
                    alt="Preview"
                    className="w-16 h-24 object-cover rounded"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <span className="text-gray-400 text-sm">Poster preview</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded font-medium transition"
                >
                  {saving
                    ? "Đang lưu..."
                    : editing === "new"
                    ? "Thêm phim"
                    : "Lưu thay đổi"}
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium transition"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-gray-400 text-center py-12">Đang tải...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-3 px-2 w-12">ID</th>
                  <th className="py-3 px-2 w-16">Poster</th>
                  <th className="py-3 px-2">Tên phim</th>
                  <th className="py-3 px-2 hidden md:table-cell">Thể loại</th>
                  <th className="py-3 px-2 hidden sm:table-cell">Loại</th>
                  <th className="py-3 px-2 hidden sm:table-cell">Năm</th>
                  <th className="py-3 px-2">Rating</th>
                  <th className="py-3 px-2 w-32">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {pageMovies.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 text-gray-200"
                  >
                    <td className="py-2 px-2 text-gray-500">{m.id}</td>
                    <td className="py-2 px-2">
                      {m.posterPath ? (
                        <img
                          src={m.posterPath}
                          alt=""
                          className="w-10 h-14 object-cover rounded"
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/40x56?text=N/A")
                          }
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-500">
                          N/A
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-2 font-medium max-w-[200px] truncate">
                      {m.title}
                    </td>
                    <td className="py-2 px-2 hidden md:table-cell text-gray-400 max-w-[150px] truncate">
                      {m.genre}
                    </td>
                    <td className="py-2 px-2 hidden sm:table-cell">
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-medium ${
                          m.type === "tv"
                            ? "bg-purple-600/30 text-purple-300"
                            : "bg-blue-600/30 text-blue-300"
                        }`}
                      >
                        {m.type === "tv" ? "TV" : "Movie"}
                      </span>
                    </td>
                    <td className="py-2 px-2 hidden sm:table-cell text-gray-400">
                      {m.releaseYear}
                    </td>
                    <td className="py-2 px-2">
                      <span
                        className={`font-medium ${
                          m.rating >= 80
                            ? "text-green-400"
                            : m.rating >= 60
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}
                      >
                        {m.rating ?? "-"}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(m)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDelete(m.id, m.title)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pageMovies.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-8 text-center text-gray-500"
                    >
                      Không tìm thấy phim nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ‹
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let p;
                if (totalPages <= 7) {
                  p = i + 1;
                } else if (page <= 4) {
                  p = i + 1;
                } else if (page >= totalPages - 3) {
                  p = totalPages - 6 + i;
                } else {
                  p = page - 3 + i;
                }
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded text-sm ${
                      page === p
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ›
              </button>
              <span className="text-gray-500 text-sm ml-2">
                Trang {page}/{totalPages}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
