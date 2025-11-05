import axiosInstance from "../axios";
import { API_ENDPOINTS, STORAGE_KEYS } from "../endpoints";

export const authService = {
  register: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.REGISTER, data);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
