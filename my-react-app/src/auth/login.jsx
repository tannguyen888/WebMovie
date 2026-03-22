import { useState } from "react";
import { backendApi } from "../api/axios"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!username || !password) {
    setError("Username và password không được để trống");
    return;
  }
  setLoading(true);
  setError("");
  try {
    const res = await backendApi.post("/api/auth/login", null, {
      params: { username, password },
    });
    if (res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } else {
      setError("Login thất bại: Không nhận được token");
    }
  } catch (err) {
    console.error("Login error:", err);
    const errorMsg = err.response?.data?.message || err.message || "Login thất bại. Kiểm tra username và password.";
    setError(errorMsg);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
        <div className="mb-6">
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
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 disabled:bg-gray-400"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Login"}
        </button>
      </div>
    </div>
  );
}
