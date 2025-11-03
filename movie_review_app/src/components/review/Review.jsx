import React from 'react';
import './Review.css';

const Review = ({ rating, date, username, reviewText }) => {
  // Necessary to make the date look better
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render the stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star-filled' : 'star-empty'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-card">
      {/* Header with rating and date */}
      <div className="review-header">
        <div className="rating-container">
          <div className="stars">
            {renderStars(rating)}
          </div>
          <span className="rating-text">
            {rating}/5
          </span>
        </div>
        <span className="review-date">
          {formatDate(date)}
        </span>
      </div>

      {/* Username */}
      <div className="review-user">
        <span className="user-label">
          Review by{' '}
          <span className="username">{username}</span>
        </span>
      </div>

      {/* Actual Review */}
      <div className="review-text">
        {reviewText}
      </div>
    </div>
  );
};

// Examples
/*const ReviewExample = () => {
  const sampleReviews = [
    {
      id: 1,
      rating: 5,
      date: '2024-10-15',
      username: 'moviefan123',
      reviewText: 'Absolutely incredible film! The cinematography was stunning and the storyline kept me engaged from start to finish. Highly recommend to anyone who loves action-packed thrillers.'
    },
    {
      id: 2,
      rating: 4,
      date: '2024-10-20',
      username: 'cinemaphile',
      reviewText: 'A solid movie with great performances. The pacing was a bit slow in the middle, but the ending made up for it. Definitely worth watching.'
    },
    {
      id: 3,
      rating: 3,
      date: '2024-10-25',
      username: 'casualviewer',
      reviewText: 'It was okay. Had some good moments but nothing spectacular. The plot was predictable but the acting saved it.'
    }
  ];

  return (
    <div className="reviews-container">
      <h1 className="reviews-title">Movie Reviews</h1>
      {sampleReviews.map((review) => (
        <Review
          key={review.id}
          rating={review.rating}
          date={review.date}
          username={review.username}
          reviewText={review.reviewText}
        />
      ))}
    </div>
  );
};*/

export default Review;