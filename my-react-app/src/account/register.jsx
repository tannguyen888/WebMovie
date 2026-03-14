import React from "react";
import axios from "axios";
import { useState } from "react";

const register = () => {
  
    const [form, setForm] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      alert("Đăng ký thành công");
    } catch (err) {
      alert(err.response?.data || "Register lỗi");
    }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 

        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input onChange={handleChange} className="w-full px-3 py-2 border rounded" type="text" id="username" name="username" required />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                    <input onChange={handleChange} className="w-full px-3 py-2 border rounded" type="email" id="email" name="email" required />
                </div>
                <div className="mb-6">

                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>

                    <input onChange={handleChange} className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" required />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300" type="submit">Register</button>
            </form>
        </div>
    </div>
  );
}
export default register;