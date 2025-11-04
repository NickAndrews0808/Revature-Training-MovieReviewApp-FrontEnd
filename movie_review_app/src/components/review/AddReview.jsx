import React, { useState } from 'react';
import './AddReview.css';

const AddReview = ({ onSubmit, movies, hideMovieSelector = false }) => {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieInput, setMovieInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState(movies || []);
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
    
    if (!hideMovieSelector && !selectedMovie) {
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
        date: new Date().toISOString().split('T')[0] // Format as YYYY-MM-DD
      };
      
      // Call the onSubmit prop function
      if (onSubmit) {
        onSubmit(reviewData);
      }
      
      // Reset inputs
      setSelectedMovie('');
      setMovieInput('');
      setRating(0);
      setReviewText('');
      setErrors({});
      if (movies) {
        setFilteredMovies(movies);
      }
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
        {/* Movie Selection with Autocomplete - Only show if not hidden */}
        {!hideMovieSelector && movies && (
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
        )}

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

export default AddReview;