import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("userData");
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserData(user);
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auths/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      document.cookie = 'connect.sid=; Max-Age=0; path=/; domain=localhost'; 
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      alert("Bạn cần phải đăng nhập lại");
      localStorage.removeItem("access_token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
