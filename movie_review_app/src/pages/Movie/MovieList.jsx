import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import MovieDetail from "./MovieDetail";
import { Link } from "react-router-dom";
import { userService } from "../../api/services/userService";
import {useWatchlist} from "../Watchlist/WatchlistContext"

function MovieList() {
    const [movies, setMovies] = useState([]);
    const{addToWatchlist}=useWatchlist();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovieList = async () => {
            try {
                const data = await userService.getMovieList();
                setMovies(data);
            } catch (err) {
                console.error("Failed to get movies: ", err);
                setError(err.message || "Failed to load movies");
            } finally {
                setLoading(false);
            }
        };
        getMovieList();
    }, []);



    //Track sort order state
    const [sortAsc, setSortAsc] = useState(true);
    
    //Sort movies dynamically
    const sortedMovies = [...movies].sort((a, b) => {
        return sortAsc
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
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
                    {/*<th>Reviews</th>*/}
                </tr>
                </thead>
                <tbody>
                {sortedMovies.map((movie) => (
                    <tr key={movie.id}>
                    <td>
                    <img
                        src={movie.imageUrl ? movie.imageUrl : "/images/placeholder.jpg"}
                        alt={movie.name}
                        onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
                        style={{ width: "200px", height: "300px", objectFit: "cover", borderRadius: "8px", border: "1px solid black" }}
                    />
                    </td>

                    <td>{movie.name}</td>
                    <td><span className="badge bg-secondary">{movie.genre}</span></td>
                    <td>{movie.year}</td>
                    <td>⭐ {movie.averageRating ?? "N/A"}</td>
                    <td>
                        <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm">+ Add Review</button>
                        <Link 
                        to={`/Moviedetail/${movie.id}`} 
                        state={{ movie }}
                        >
                            <button className="btn btn-outline-secondary btn-sm">View</button>
                        </Link>
                        <button className="btn btn-warning btn-sm" style={{ marginLeft: "10px" }} onClick={() => addToWatchlist({
                            id: movie.id,
                            name: movie.name,         // map title -> name
                            imageUrl: movie.imageUrl,     // map image -> imageUrl
                            genre: movie.genre,
                            year: movie.year,
                            averageRating: movie.averageRating
                        })}>
                            + Watchlist
                        </button>

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
