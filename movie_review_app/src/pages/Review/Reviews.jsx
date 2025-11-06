import React, { useState, useEffect } from 'react';
import AddReview from '../../components/review/AddReview';
import Review from '../../components/review/Review';
import './Reviews.css';
import { userService } from '../../api/services/userService';

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const data = await userService.getAllReviews();
        console.log("All reviews fetched:", data);

        // If movieId is provided, filter for that movie
        const filteredReviews = movieId
          ? data.filter(review => review.movieId === movieId)
          : data;

        setReviews(filteredReviews);
      } catch (err) {
        console.error("Failed to get reviews:", err);
        setError(err.message || "Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, [movieId]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      const savedReview = await userService.postMovieReview(
        { id: movieId },
        {
          username: reviewData.username || 'CurrentUser', // Replace with actual logged-in user
          rating: reviewData.rating,
          reviewText: reviewData.reviewText
        }
      );

      // Normalize date (truncate microseconds)
      let cleanedDate = savedReview.createdAt;
      if (cleanedDate) {
        const dotIndex = cleanedDate.indexOf('.');
        if (dotIndex !== -1) {
          cleanedDate = cleanedDate.slice(0, dotIndex + 4); // keep 3 digits for ms
        }
      }
      savedReview.date = cleanedDate;

      setReviews([savedReview, ...reviews]);
    } catch (err) {
      console.error("Failed to create review:", err);
      setError(err.message || "Failed to create review");
    }
  };

  if (loading) return <div className="reviews-page">Loading reviews...</div>;
  if (error) return <div className="reviews-page">Error: {error}</div>;

  return (
    <div className="reviews-page">
      <AddReview onSubmit={handleReviewSubmit} hideMovieSelector={true} />
      
      <div className="reviews-list">
        <h2>All Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet. Be the first to add one!</p>
        ) : (
          reviews.map(review => {
            const displayDate = review.date || review.createdAt;
            return (
              <Review
                key={review.id}
                rating={review.rating}
                date={displayDate}
                username={review.username}
                reviewText={review.reviewText || review.review}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Reviews;
