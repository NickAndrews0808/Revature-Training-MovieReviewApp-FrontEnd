// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../api/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );

  const login = async (credentials) => {
    try {
      const resp = await authService.login(credentials);
      setIsAuthenticated(true);
      localStorage.setItem("user_id", resp.user.id);
      localStorage.setItem("user_name", resp.user.username);
      localStorage.setItem("user_email", resp.user.email);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // So LoginForm can display the error message
    }
  };

  const register = async (data) => {
    try {
      const resp = await authService.register(data);
      localStorage.setItem("user_id", resp.user.id);
      localStorage.setItem("user_name", resp.user.username);
      localStorage.setItem("user_email", resp.user.email);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
