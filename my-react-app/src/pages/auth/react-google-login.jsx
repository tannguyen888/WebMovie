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
        .then((data) => {
          console.log('Google registration successful: ', data);
          window.location.href = "/"; 
        })
        .catch((error) => {
          console.error('Google registration failed: ', error);
        });
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