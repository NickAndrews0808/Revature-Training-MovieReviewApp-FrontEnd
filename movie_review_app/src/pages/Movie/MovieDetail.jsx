import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/review/Review";
import "../Dashboard/Dashboard.css";
import "./MovieDetail.css";
// Added a MovieDetail.css but we can use bootstrap if we want
const MovieDetail = () => {
    const { id } = useParams(); // get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hey Justin I added this temporarily to see what looks good
    useEffect(() => {
        // TODO: Replace with actual API call to backend
        // fetch(`/api/movies/${id}`)
        // fetch(`/api/movies/${id}/reviews`)
        
        // Fake API call simulation
        const fetchMovieAndReviews = async () => {
        try {
            setLoading(true);
            setError(null);
            // Fetch movie details
            const movieRes = await fetch(`http://localhost:8080/api/movies/${id}`);
            if (!movieRes.ok) throw new Error("Failed to fetch movie");
            const movieData = await movieRes.json();
            setMovie(movieData);
            // Simulate fetching reviews from backend
            // In production, this would be: const response = await fetch(`/api/movies/${id}/reviews`);
            const mockReviews = [
            {
                id: 1,
                rating: 5,
                date: '2024-10-27',
                username: 'moviefan123',
                reviewText: 'Absolutely incredible film! The cinematography was stunning and the storyline kept me engaged from start to finish.'
            }
            ];
            
            // Sort reviews by date (newest first)
            // Not sure if this is necessary if theyre already sorted from backend
            const sortedReviews = mockReviews.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
            );
            
            setReviews(sortedReviews);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
        };

        fetchMovieAndReviews();
    }, [id]); // Re-fetch when movie ID changes

    return (
        <div className="movie-container">
        {/* Movie Details Section */}
        <div className="movie-info">
            <img
            src={movie?.imageUrl || "/images/placeholder.jpg"}
            alt={movie?.name || "Movie Poster"}
            onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
            style={{ width: "200px", height: "300px", objectFit: "cover", borderRadius: "8px", border: "1px solid black" }}
            />
            {movie?.ytUrl ? (
            <div className="movie-trailer mt-3">
                <div className="ratio ratio-16x9">
                <iframe
                    src={
                    movie.ytUrl.includes("watch?v=")
                        ? movie.ytUrl.replace("watch?v=", "embed/")
                        : movie.ytUrl
                    }
                    title="YouTube trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                </div>
            </div>
            ) : (
            <p className="text-muted mt-3">No trailer available.</p>
            )}
            <h2>{movie?.name}</h2>
            <p><strong>Director:</strong> {movie?.director}</p>
            <p><strong>Genre:</strong> {movie?.genre}</p>
            <p><strong>Year:</strong> {movie?.year}</p>
            <p><strong>Rating:</strong> {movie?.averageRating} ⭐</p>
            <p><strong>Description:</strong> {movie?.description}</p>
        </div>

        {/* Reviews Section */}
        <div className="movie-reviews-section">
            <h3 className="reviews-header">
            Reviews ({reviews.length})
            </h3>
            
            {loading ? (
            <div className="loading-message">Loading reviews...</div>
            ) : reviews.length > 0 ? (
            <div className="reviews-list">
                {reviews.map(review => (
                <Review
                    key={review.id}
                    rating={review.rating}
                    date={review.date}
                    username={review.username}
                    reviewText={review.reviewText}
                />
                ))}
            </div>
            ) : (
            <div className="no-reviews-message">
                No reviews yet. Be the first to review this movie!
            </div>
            )}
        </div>
        </div>
    );
};

export default MovieDetail;