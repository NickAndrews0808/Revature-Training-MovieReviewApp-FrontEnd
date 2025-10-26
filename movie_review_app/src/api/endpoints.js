const isDevelopment = process.env.NODE_ENV === 'development';
export const API_BASE_URL = isDevelopment? 'http://localhost:8081' : 'abc';//replace with actual production URL
export const FRONTEND_URL = isDevelopment ? 'http://localhost:5173' : 'abc';

export const GOOGLE_CLIENT_ID = '637515011403-mb5d9oq5dq9irin8278nb6ic1a0c1oq4.apps.googleusercontent.com'; // Replace with your actual Google Client ID
export const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
export const GOOGLE_REDIRECT_URI = `${FRONTEND_URL}/oauth2/redirect`;
export const API_ENDPOINTS={
    GOOGLE_AUTH_VERIFY: `${API_BASE_URL}/auth/google/verify`,
    LOGIN:"/auth/login",
    LOGOUT:"/auth/logout",
}

export const STORAGE_KEYS={
    ACCESS_TOKEN:"accessToken",
    REFRESH_TOKEN:"refreshToken",
}