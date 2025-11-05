const isDevelopment = process.env.NODE_ENV === 'development';
export const API_BASE_URL = isDevelopment? 'http://localhost:8087' : 'abc';//replace with actual production URL
export const FRONTEND_URL = isDevelopment ? 'http://localhost:5173' : 'abc';

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