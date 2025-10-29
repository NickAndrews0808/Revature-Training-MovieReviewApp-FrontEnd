import { useState } from "react";
import "../Dashboard/Dashboard.css";
import MovieDetail from "./MovieDetail";
import { Link } from "react-router-dom";

function MovieList() {
    const movies = [
        {
            id: 1,
            title: "Avengers",
            genre: "Action",
            year: 2024,
            rating: 4.5,
            reviews: 1247,
            image: "/images/The_Avengers.jpg",
        },
        {
            id: 2,
            title: "The Godfather",
            genre: "Crime-Thriller",
            year: 2023,
            rating: 4.8,
            reviews: 932,
            image: "/images/Godfather.jpg",
        },
        {
            id: 3,
            title: "Schindler's List",
            genre: "Historical Drama",
            year: 2023,
            rating: 4.8,
            reviews: 932,
            image: "/images/Schindler's_List.jpg",
        }
    ];

    //Track sort order state
    const [sortAsc, setSortAsc] = useState(true);

    //Sort movies dynamically
    const sortedMovies = [...movies].sort((a, b) => {
        return sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

    //Toggle sort order
    const toggleSort = () => setSortAsc(!sortAsc);

    return (
        <div className="container mt-4">
        <section className="popular-movies">
            <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="text-primary">Movie List</h3>
            <button onClick={toggleSort} className="btn btn-outline-primary btn-sm">
                Sort by Title {sortAsc ? "▲" : "▼"}
            </button>
            </div>

            <p className="text-muted mb-4">
            Browse your available movies and reviews
            </p>

            <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                </tr>
                </thead>
                <tbody>
                {sortedMovies.map((movie) => (
                    <tr key={movie.id}>
                    <img
                        src={movie.image}
                        alt="Poster"
                        className="rounded"
                        style={{ width: "60px", height: "90px", objectFit: "cover" }}
                    />
                    <td>{movie.title}</td>
                    <td>
                        <span className="badge bg-secondary">{movie.genre}</span>
                    </td>
                    <td>{movie.year}</td>
                    <td>⭐ {movie.rating}</td>
                    <td>{movie.reviews}</td>
                    <td>
                        <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm">
                            + Add Review
                        </button>
                        <Link to={`/MovieDetail/${movie.id}`}>
                            <button className="btn btn-outline-secondary btn-sm">
                            View
                            </button>
                        </Link>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </section>
        </div>
    );
    }

export default MovieList;
