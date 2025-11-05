const isDevelopment = process.env.NODE_ENV === 'development';
export const API_BASE_URL = 'http://ec2-54-234-94-174.compute-1.amazonaws.com:8087';//replace with actual production URL
export const FRONTEND_URL = 'http://localhost:5173';

export const API_ENDPOINTS={
    REGISTER:"/users/create",
    LOGIN:"/auth/login",
    LOGOUT:"/auth/logout",
    DASHBOARD:"/api/movies",
    USER_UPDATE:"/users",
    MOVIEDETAIL:"/api/movies"
}

export const STORAGE_KEYS={
    ACCESS_TOKEN:"accessToken",
    REFRESH_TOKEN:"refreshToken",
}