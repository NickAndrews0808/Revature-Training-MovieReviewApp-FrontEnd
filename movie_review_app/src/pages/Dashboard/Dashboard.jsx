import { Link } from 'react-router-dom';
import './Dashboard.css'
import NavLinks from '../../components/NavLinks';
function Dashboard(){
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
        // Add more movies here
    ];
    const sortedMovies = movies.sort((a, b) => b.rating - a.rating);

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
                        src={movie.image}
                        alt="Poster"
                        className="rounded"
                        style={{ width: "60px", height: "90px", objectFit: "cover" }}
                    />
                    </td>
                    <td>{movie.title}</td>
                    <td>
                    <span className="badge bg-secondary">{movie.genre}</span>
                    </td>
                    <td>{movie.year}</td>
                    <td>⭐ {movie.rating}</td>
                    <td>{movie.reviews.toLocaleString()}</td>
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