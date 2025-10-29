import React, { useState } from 'react';
import './AddReview.css';

const AddReview = ({ onSubmit, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieInput, setMovieInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});

  // Handle movie input change and filter movies
  const handleMovieInputChange = (e) => {
    const value = e.target.value;
    setMovieInput(value);
    setSelectedMovie('');
    setShowDropdown(true);

    // Filter movies based on input
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  // Handle movie selection from dropdown
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie.id);
    setMovieInput(movie.title);
    setShowDropdown(false);
    setFilteredMovies(movies);
  };

  // Handle input focus
  const handleInputFocus = () => {
    setShowDropdown(true);
    setFilteredMovies(movies);
  };

  // Handle click outside to close dropdown
  const handleInputBlur = () => {
    // Delay to allow click on dropdown item
    setTimeout(() => setShowDropdown(false), 200);
  };

  // Validate inputs
  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedMovie) {
      newErrors.movie = 'Please select a movie';
    }
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!reviewText.trim()) {
      newErrors.reviewText = 'Please write a review';
    } else if (reviewText.trim().length < 10) {
      newErrors.reviewText = 'Review must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      const reviewData = {
        movieId: selectedMovie,
        rating: rating,
        reviewText: reviewText.trim(),
        date: new Date().toISOString()
      };
      
      // Call the onSubmit prop function (would connect to backend)
      if (onSubmit) {
        onSubmit(reviewData);
      }
      
      // Reset inputs
      setSelectedMovie('');
      setMovieInput('');
      setRating(0);
      setReviewText('');
      setErrors({});
      setFilteredMovies(movies);
    }
  };

  // Render interactive star rating
  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          className={`star-button ${i <= (hoverRating || rating) ? 'star-active' : 'star-inactive'}`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="add-review-container">
      <h2 className="add-review-title">Write a Review</h2>
      
      <div className="add-review-form">
        {/* Movie Selection with Autocomplete */}
        <div className="form-group">
          <label htmlFor="movie-input" className="form-label">
            Select Movie
          </label>
          <div className="autocomplete-wrapper">
            <input
              id="movie-input"
              type="text"
              className={`form-input ${errors.movie ? 'input-error' : ''}`}
              placeholder="Type to search movies..."
              value={movieInput}
              onChange={handleMovieInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              autoComplete="off"
            />
            {showDropdown && filteredMovies.length > 0 && (
              <ul className="autocomplete-dropdown">
                {filteredMovies.map((movie) => (
                  <li
                    key={movie.id}
                    className="autocomplete-item"
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
            {showDropdown && filteredMovies.length === 0 && movieInput && (
              <div className="autocomplete-no-results">
                No movies found
              </div>
            )}
          </div>
          {errors.movie && <span className="error-message">{errors.movie}</span>}
        </div>

        {/* Star Rating */}
        <div className="form-group">
          <label className="form-label">
            Rating
          </label>
          <div className="star-rating-container">
            {renderStarRating()}
            {rating > 0 && (
              <span className="rating-display">{rating}/5</span>
            )}
          </div>
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        {/* Review Text */}
        <div className="form-group">
          <label htmlFor="review-text" className="form-label">
            Your Review
          </label>
          <textarea
            id="review-text"
            className={`form-textarea ${errors.reviewText ? 'input-error' : ''}`}
            rows="6"
            placeholder="Share your thoughts about the movie..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="character-count">
            {reviewText.length} characters
          </div>
          {errors.reviewText && <span className="error-message">{errors.reviewText}</span>}
        </div>

        {/* Submit Button */}
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit Review
        </button>
      </div>
    </div>
  );
};

// Example usage with demo
const AddReviewExample = () => {
  // Sample movie data (would come from your backend)
  const sampleMovies = [
    { id: 1, title: 'The Shawshank Redemption' },
    { id: 2, title: 'The Godfather' },
    { id: 3, title: 'The Dark Knight' },
    { id: 4, title: 'Pulp Fiction' },
    { id: 5, title: 'Inception' },
    { id: 6, title: 'The Matrix' },
    { id: 7, title: 'Forrest Gump' },
    { id: 8, title: 'Interstellar' },
    { id: 9, title: 'The Prestige' },
    { id: 10, title: 'The Departed' }
  ];

  const [submittedReviews, setSubmittedReviews] = useState([]);

  const handleReviewSubmit = (reviewData) => {
    const movie = sampleMovies.find(m => m.id === parseInt(reviewData.movieId));
    const newReview = {
      ...reviewData,
      movieTitle: movie.title,
      id: Date.now()
    };
    setSubmittedReviews([newReview, ...submittedReviews]);
    alert('Review submitted successfully!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <AddReview movies={sampleMovies} onSubmit={handleReviewSubmit} />
      
      {submittedReviews.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>Recent Submissions</h3>
          {submittedReviews.map((review) => (
            <div key={review.id} style={{ 
              background: '#ffffff', 
              padding: '15px', 
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <strong style={{ color: '#1f2937' }}>{review.movieTitle}</strong> - {review.rating} stars
              <p style={{ marginTop: '8px', color: '#4b5563' }}>{review.reviewText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddReviewExample;