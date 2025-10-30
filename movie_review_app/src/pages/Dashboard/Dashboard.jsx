import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'
import NavLinks from '../../components/NavLinks';
function Dashboard(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/movies')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch movies');
                return res.json();
            })
            .then(data => setMovies(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const sortedMovies = [...movies].sort((a, b) => b.averageRating - a.averageRating);

    if (loading) return <p>Loading movies...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div className="container mt-4">

            {/* POPULAR MOVIES */}
            <section className="popular-movies">
            <h3 className="text-primary mb-3">Popular Movies</h3>
            <p className="text-muted mb-4">Browse and review the latest trending movies</p>
            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                    <th>Rank</th>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    
                    </tr>
                </thead>
                <tbody>
                {sortedMovies.map((movie, index) => (
                <tr key={movie.id}>
                    <td><strong>{index + 1}</strong></td>
                    <td>
                    <img
                        src={movie.imageUrl ? movie.imageUrl : "/images/placeholder.jpg"}
                        alt={movie.name}
                        onError={(e) => { e.target.src = "/images/placeholder.jpg"; }}
                        style={{ width: "200px", height: "300px", objectFit: "cover", borderRadius: "8px", border: "1px solid black" }}
                    />
                    </td>
                    <td>{movie.name}</td>
                    <td>
                    <span className="badge bg-secondary">{movie.genre}</span>
                    </td>
                    <td>{movie.year}</td>
                    <td>⭐ {movie.averageRating}</td>
                    {/*<td>{movie.reviews.toLocaleString()}</td>*/}
                    <td>
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary btn-sm">+ Add Review</button>
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
export default Dashboard;