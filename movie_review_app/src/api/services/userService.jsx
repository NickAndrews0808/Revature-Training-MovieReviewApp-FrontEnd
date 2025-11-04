import axiosInstance from "../axios"
import { API_ENDPOINTS } from "../endpoints"

export const userService={
    getMovieList:async()=>{
        const response=await axiosInstance.get(API_ENDPOINTS.DASHBOARD);
        return response.data;
    },
    getMovieDetails:async(id)=>{
        const response = await axiosInstance.get(`${API_ENDPOINTS.MOVIEDETAIL}/${id}`);
        return response.data;
    }
}