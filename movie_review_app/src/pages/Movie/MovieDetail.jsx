import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/review/Review";
import "../Dashboard/Dashboard.css";
import "./MovieDetail.css";
import { userService } from "../../api/services/userService";

const MovieDetail = () => {
    const { id } = useParams(); // movie ID from route
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieAndReviews = async () => {
            try {
                // Fetch movie details
                const movieData = await userService.getMovieDetails(id);
                console.log("Movie API response:", movieData);
                setMovie(movieData);

                // Fetch reviews
                const reviewsData = await userService.getMovieReviews(id);
                console.log("Reviews API response:", reviewsData);

                // Wrap single object in array if necessary
                setReviews(Array.isArray(reviewsData) ? reviewsData : [reviewsData]);
            } catch (err) {
                console.error("Error fetching movie or reviews:", err);
                setError("Failed to load movie details");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieAndReviews();
    }, [id]);

    if (loading) return <div className="loading-message">Loading movie details...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    return (
        <div className="movie-container">
            {/* 🎬 Movie Info Section */}
            <div className="movie-info">
                <img
                    src={movie?.imageUrl || "/images/placeholder.jpg"}
                    alt={movie?.name || "Movie Poster"}
                    onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
                    style={{
                        width: "200px",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid black",
                    }}
                />
                {movie?.ytUrl ? (
                    <div className="movie-trailer mt-3">
                        <div className="ratio ratio-16x9">
                            <iframe
                                src={movie.ytUrl.includes("watch?v=")
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

            {/* 📝 Reviews Section */}
            <div className="movie-reviews-section">
                <h3 className="reviews-header">Reviews ({reviews.length})</h3>

                {reviews.length > 0 ? (
                    <div className="reviews-list">
                        {reviews.map((review) => (
                            <Review
                                key={review.id}
                                rating={review.rating}
                                date={review.createdOn || review.date}
                                username={review.username}
                                reviewText={review.review || review.reviewText}
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
