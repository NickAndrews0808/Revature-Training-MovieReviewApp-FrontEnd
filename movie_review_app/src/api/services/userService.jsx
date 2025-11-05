import axiosInstance from "../axios"
import { API_ENDPOINTS } from "../endpoints"

export const userService={
    getMovieList:async()=>{
        const response=await axiosInstance.get(API_ENDPOINTS.DASHBOARD);
        return response.data;
    },

    updateUserDetails: async (userData) => {
        const response = await axiosInstance.put(`${API_ENDPOINTS.USER_UPDATE}/${userData.id}`,
            {
                username: userData.username,
                email: userData.email
            }
        );
        return response.data;
    },
    getMovieDetails:async(id)=>{
        const response = await axiosInstance.get(`${API_ENDPOINTS.MOVIEDETAIL}/${id}`);
        return response.data;
    },

    getMovieReviews: async (movieId) => {
        const response = await axiosInstance.get(`${API_ENDPOINTS.MOVIEREVIEWS}/${movieId}`);
        return response.data;
    },


    postMovieReview: async (movieDetails, userData) => {
        const response = await axiosInstance.post(`${API_ENDPOINTS.REVIEW}`, {
            movieId: movieDetails.id,
            username: userData.username,
            rating: userData.rating,
            review: userData.reviewText,
        });
        return response.data;
    }

}