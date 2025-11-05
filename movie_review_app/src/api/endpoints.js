const isDevelopment = process.env.NODE_ENV === 'development';
export const API_BASE_URL = 'http://trng2309-7.s3-website.us-east-2.amazonaws.com';//replace with actual production URL
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