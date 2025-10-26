// api/services/authService.js
import axiosInstance from "../axios";
import {
  API_ENDPOINTS,
  GOOGLE_CLIENT_ID,
  GOOGLE_OAUTH_URL,
  GOOGLE_REDIRECT_URI,
  STORAGE_KEYS,
} from "../endpoints";

export const authService = {
  login: async (credentials) => {
    const response = await axiosInstance.post(API_ENDPOINTS.LOGIN, credentials);
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.token);
    return response.data;
  },

  initiateGoogleLogin: () => {
    const state = Math.random().toString(36).substring(7);
    sessionStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "email profile openid",
      state: state,
      access_type: "offline",
      prompt: "consent",
    });
    window.location.href = `${GOOGLE_OAUTH_URL}?${params.toString()}`;
  },

  handleGoogleCallback: async (code, state) => {
    // Verify state to prevent CSRF attacks
    const savedState = sessionStorage.getItem("oauth_state");
    if (state !== savedState) {
      throw new Error("Invalid state parameter - possible CSRF attack");
    }
    sessionStorage.removeItem("oauth_state");

    // Send authorization code to backend for verification
    const response = await axiosInstance.post(
      API_ENDPOINTS.GOOGLE_AUTH_VERIFY,
      {
        code: code,
        redirectUri: GOOGLE_REDIRECT_URI,
      }
    );

    // Store tokens received from your backend
    if (response.data.accessToken) {
      localStorage.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        response.data.accessToken
      );
      if (response.data.refreshToken) {
        localStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          response.data.refreshToken
        );
      }
    }

    return response.data;
  },

  logout: () => {
    localStorage.removeItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },
};
