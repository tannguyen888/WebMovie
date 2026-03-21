import { useState } from "react";
import { backendApi } from "./api/axios"

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("Tất cả các trường không được để trống");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password không khớp");
      return;
    }
    if (password.length < 6) {
      setError("Password phải có ít nhất 6 ký tự");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await backendApi.post("/api/auth/register", {
        username,
        password,
        email,
      });
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      } else {
        setError("Register thất bại: Không nhận được token");
      }
    } catch (err) {
      console.error("Register error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Register thất bại. Thử lại sau.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Register"}
        </button>
      </div>
    </div>
  );
}
