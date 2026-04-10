import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../config/axios";
import { TOKEN_KEY } from "../../utils/constants";



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
      const res = await api.post("/auth/login/google", { tokenId });
      if (res.data?.token) {
        localStorage.setItem(TOKEN_KEY, res.data.token);
      } else {
        console.error("Login failed", res.data);
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