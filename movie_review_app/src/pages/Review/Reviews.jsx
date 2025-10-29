import React, { useState } from 'react';
import AddReview from '../../components/review/AddReview';
import Review from '../../components/review/Review';
import './Reviews.css';

function Reviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      date: '2024-10-15',
      username: 'moviefan123',
      reviewText: 'Absolutely incredible film! The cinematography was stunning.'
    },
    {
      id: 2,
      rating: 4,
      date: '2024-10-20',
      username: 'cinemaphile',
      reviewText: 'A solid movie with great performances.'
    }
  ]);

  const sampleMovies = [
    { id: 1, title: 'The Shawshank Redemption' },
    { id: 2, title: 'The Godfather' },
    { id: 3, title: 'The Dark Knight' },
    { id: 4, title: 'Pulp Fiction' },
    { id: 5, title: 'Inception' }
  ];

  const handleReviewSubmit = (reviewData) => {
    const movie = sampleMovies.find(m => m.id === parseInt(reviewData.movieId));
    const newReview = {
      id: Date.now(),
      rating: reviewData.rating,
      date: reviewData.date,
      username: 'CurrentUser', // Replace with actual logged-in user
      reviewText: reviewData.reviewText,
      movieTitle: movie.title
    };
    
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="reviews-page">
      <AddReview movies={sampleMovies} onSubmit={handleReviewSubmit} />
      
      <div className="reviews-list">
        <h2>All Reviews</h2>
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
    </div>
  );
}

export default Reviews;