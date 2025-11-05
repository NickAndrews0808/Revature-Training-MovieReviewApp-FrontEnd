import React, { useState, useEffect } from 'react';
import './AddReview.css';
import { userService } from "../../api/services/userService";

const AddReview = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [movieInput, setMovieInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errors, setErrors] = useState({});

  // 🔹 Fetch movies on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await userService.getMovieList();
        setMovies(data);
        setFilteredMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  // 🔹 Filter movies by name
  const handleMovieInputChange = (e) => {
    const value = e.target.value;
    setMovieInput(value);
    setSelectedMovie('');
    setShowDropdown(true);

    const filtered = movies.filter(movie =>
      movie.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie.id);
    setMovieInput(movie.name);
    setShowDropdown(false);
    setFilteredMovies(movies);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
    setFilteredMovies(movies);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  // 🔹 Validate before submission
  const validateForm = () => {
    const newErrors = {};
    if (!selectedMovie) newErrors.movie = 'Please select a movie';
    if (rating === 0) newErrors.rating = 'Please select a rating';
    if (!reviewText.trim()) newErrors.reviewText = 'Please write a review';
    else if (reviewText.trim().length < 1)
      newErrors.reviewText = 'Review must be at least 1 character';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const username = localStorage.getItem("user_name");
    if (!username) {
      alert("Please log in to submit a review.");
      return;
    }

    try {
      const movieDetails = { id: selectedMovie };
      const userData = { username, rating, reviewText };

      const res = await userService.postMovieReview(movieDetails, userData);
      console.log("✅ Review posted:", res);
      alert("Review submitted successfully!");

      // Reset form
      setSelectedMovie('');
      setMovieInput('');
      setRating(0);
      setReviewText('');
      setErrors({});
    } catch (err) {
      console.error("❌ Error submitting review:", err);
      alert("Failed to submit review. Please try again later.");
    }
  };

  // 🔹 Star rating renderer
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
        {/* 🔹 Movie Search Bar */}
        <div className="form-group">
          <label htmlFor="movie-input" className="form-label">Select Movie</label>
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
                    {movie.name}
                  </li>
                ))}
              </ul>
            )}
            {showDropdown && filteredMovies.length === 0 && movieInput && (
              <div className="autocomplete-no-results">No movies found</div>
            )}
          </div>
          {errors.movie && <span className="error-message">{errors.movie}</span>}
        </div>

        {/* 🔹 Star Rating */}
        <div className="form-group">
          <label className="form-label">Rating</label>
          <div className="star-rating-container">
            {renderStarRating()}
            {rating > 0 && <span className="rating-display">{rating}/5</span>}
          </div>
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        {/* 🔹 Review Text */}
        <div className="form-group">
          <label htmlFor="review-text" className="form-label">Your Review</label>
          <textarea
            id="review-text"
            className={`form-textarea ${errors.reviewText ? 'input-error' : ''}`}
            rows="6"
            placeholder="Share your thoughts about the movie..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="character-count">{reviewText.length} characters</div>
          {errors.reviewText && <span className="error-message">{errors.reviewText}</span>}
        </div>

        {/* 🔹 Submit Button */}
        <button type="button" onClick={handleSubmit} className="submit-button">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default AddReview;
