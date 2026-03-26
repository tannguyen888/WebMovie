import { useState } from "react";
import axios from "axios";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/register", form);
            alert("Đăng ký thành công");
        } catch (err) {
            alert(err.response?.data || "Register lỗi");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                        <input
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            id="username"
                            name="username"
                            value={form.username}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                        <input
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            required
                        />
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;