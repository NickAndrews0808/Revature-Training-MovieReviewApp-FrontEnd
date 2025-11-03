import React, { useState, useEffect } from 'react';
import AddReview from '../../components/review/AddReview';
import Review from '../../components/review/Review';
import './Reviews.css';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviewsByMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8087/api/reviews/movie/${movieId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to get reviews: ", err);
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      getReviewsByMovie();
    } else {
      setLoading(false);
    }
  }, [movieId]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const newReview = {
        rating: reviewData.rating,
        date: reviewData.date,
        username: 'CurrentUser', // Replace with actual logged-in user
        reviewText: reviewData.reviewText,
        movieId: movieId
      };

      const response = await fetch('http://localhost:8087/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview)
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      const savedReview = await response.json();
      setReviews([savedReview, ...reviews]);
    } catch (err) {
      console.error("Failed to create review: ", err);
      setError(err.message || "Failed to create review");
    }
  };

  if (loading) {
    return <div className="reviews-page">Loading reviews...</div>;
  }

  if (error) {
    return <div className="reviews-page">Error: {error}</div>;
  }

  return (
    <div className="reviews-page">
      {/* Don't pass movies prop since we're only reviewing one movie */}
      <AddReview onSubmit={handleReviewSubmit} hideMovieSelector={true} />
      
      <div className="reviews-list">
        <h2>All Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map(review => (
            <Review
              key={review.id}
              rating={review.rating}
              date={review.date}
              username={review.username}
              reviewText={review.reviewText}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;