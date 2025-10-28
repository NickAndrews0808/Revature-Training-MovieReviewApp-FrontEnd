import React from "react";
import { useParams } from "react-router-dom";
import "../Dashboard/Dashboard.css";

const MovieDetail = () => {
  const { id } = useParams(); // get the movie ID from the URL

    const movie = {
        id,
        title: "Example Movie",
        description: "This is an example movie description.",
        year: 2025,
    };

    return (
        <div className="dashboard-container">
        <h2>{movie.title}</h2>
        <p><strong>Year:</strong> {movie.year}</p>
        <p>{movie.description}</p>
        </div>
    );
};

export default MovieDetail;
