import React from "react";
import axios from "axios";
import { useState } from "react";

const login = () => {
  
    const [form, setForm] = React.useState({
        username: "",
        password: ""
    }); 
   const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        await axios.post("http://localhost:8080/api/auth/login", form); 

       alert("Đăng nhập thành công");
    } catch (err) {
        alert(err.response?.data || "Login lỗi");
        }   
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form>
                <div className="mb-4">  
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>

                    <input className="w-full px-3 py-2 border rounded" type="text" id="username" name="username" required />
                </div>
                <div className="mb-6">

                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input className="w-full px-3 py-2 border rounded" type="password" id="password" name="password" required />
                </div>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300" type="submit">Login</button>
            </form>
            
        </div>  
    </div>
  );
}   
export default login;