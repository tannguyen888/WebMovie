import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import API_AUTH from "../../config/axios";
import { registerWithGoogle } from "../../services/authService";



const GoogleLoginButton = () => {
  const handleLogin = (response) => {
    console.log('Login successful: ', response);
    const token = response.credential;
    if (token) {
      registerWithGoogle(token)
      loginWithGoogle(token)
        .then((data) => {
          console.log('Google registration successful: ', data);
          window.location.href = "/"; 
        })
        .catch((error) => {
          console.error('Google registration failed: ', error);
        });
    }

  };

    const loginWithGoogle = async (tokenId) => {
    try {
      const response = await fetch("http://localhost:8080/api/login/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenId }),
      });

      const data = await response.json();
      if (data.token) {
        // Lưu JWT token vào localStorage hoặc sessionStorage
        localStorage.setItem("jwtToken", data.token);
      } else {
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };


  return (
    <div>
      <GoogleLogin 
        onSuccess={handleLogin} 
        onError={(error) => console.error('Login Error:', error)} 
      />
    </div>
  );
};

export default GoogleLoginButton;