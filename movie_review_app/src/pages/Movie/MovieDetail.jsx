import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Review from "../../components/review/Review";
import "../Dashboard/Dashboard.css";
import "./MovieDetail.css";
// Added a MovieDetail.css but we can use bootstrap if we want
    const movies = [
        {
            id: 1,
            director: "Joss Whedon",
            title: "Avengers",
            genre: "Action",
            year: 2024,
            rating: 4.5,
            image: "/images/The_Avengers.jpg",
            desc: "Nick Fury forms the Avengers—Iron Man, Captain America, Thor, Hulk, Black Widow, and Hawkeye—to stop Loki from invading Earth with an alien army. After initial conflicts, they learn to work together and defeat Loki in New York, saving the world."
        },
        {
            id: 2,
            director: "Francis Ford Coppola",
            title: "The Godfather",
            genre: "Crime-Thriller",
            year: 2023,
            rating: 4.8,
            image: "/images/Godfather.jpg",
            desc: "Michael Corleone reluctantly joins his family's mafia business after an attempt on his father’s life and rises to become a powerful, ruthless leader."
        },
        {
            id: 3,
            director: "Steven Spielberg",
            title: "Schindler's List",
            genre: "Historical Drama",
            year: 2023,
            rating: 4.8,
            image: "/images/Schindler's_List.jpg",
            desc: "Oskar Schindler saves over a thousand Jews from the Holocaust by employing them in his factories, risking everything to protect them from the Nazis."
        }
    ];
const MovieDetail = () => {
    const { id } = useParams(); // get the movie ID from the URL
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const movie = movies.find(m => m.id === parseInt(id));

    // Hey Justin I added this temporarily to see what looks good
    useEffect(() => {
        // TODO: Replace with actual API call to backend
        // fetch(`/api/movies/${id}`)
        // fetch(`/api/movies/${id}/reviews`)
        
        // Fake API call simulation
        const fetchMovieAndReviews = async () => {
        try {
            setLoading(true);
            
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
            src={movie.image}
            alt={movie.title}
            className="img-fluid mb-3"
            />
            <h2>{movie.title}</h2>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Rating:</strong> {movie.rating} ⭐</p>
            <p><strong>Description:</strong> {movie.desc}</p>
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