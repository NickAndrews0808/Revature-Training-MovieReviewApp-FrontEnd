import { useWatchlist } from "../Watchlist/WatchlistContext";
import { Link } from "react-router-dom";

export default function Watchlist() {
    const { watchlist, removeWatchlist } = useWatchlist();

    return (
        <div className="container mt-4">
        <h3 className="text-primary mb-3">🎥 Your Watchlist</h3>

        {watchlist.length === 0 ? (
            <p className="text-muted">No movies added yet!</p>
        ) : (
            <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Rating</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {watchlist.map((movie, index) => (
                    <tr key={movie.id}>
                    <td><strong>{index + 1}</strong></td>
                    <td>
                        <img
                        src={movie.imageUrl ? movie.imageUrl : "/images/placeholder.jpg"}
                        alt={movie.name}
                        onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
                        style={{
                            width: "100px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid black"
                        }}
                        />
                    </td>
                    <td>{movie.name}</td>
                    <td><span className="badge bg-secondary">{movie.genre}</span></td>
                    <td>{movie.year}</td>
                    <td>⭐ {movie.averageRating ?? "N/A"}</td>
                    <td>
                        <div className="d-flex gap-2">
                        <Link to={`/MovieDetail/${movie.id}`}>
                            <button className="btn btn-outline-primary btn-sm">
                            View
                            </button>
                        </Link>
                        <button
                            onClick={() => removeWatchlist(movie.id)}
                            className="btn btn-outline-danger btn-sm"
                        >
                            Remove
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
        </div>
    );
}
