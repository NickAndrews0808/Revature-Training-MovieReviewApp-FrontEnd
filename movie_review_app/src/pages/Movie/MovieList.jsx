import '../Dashboard/Dashboard.css'
function MovieList(){
    const movies = [
        {
        id: 1,
        title: "The Quantum Paradox",
        genre: "Sci-Fi",
        year: 2024,
        rating: "⭐ 4.5",
        reviews: 1247,
        },
        {
        id: 2,
        title: "Whispers of the Deep",
        genre: "Thriller",
        year: 2023,
        rating: "⭐ 4.2",
        reviews: 998,
        },
        {
        id: 3,
        title: "Journey Beyond Stars",
        genre: "Adventure",
        year: 2025,
        rating: "⭐ 4.8",
        reviews: 2034,
        },
    ];

    return (
        <div className="dashboard">
        <section className="popular-movies">
            <h3>Movie List</h3>
            <p>Browse your available movies and reviews</p>

            <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                <tr key={movie.id}>
                    <td>{movie.title}</td>
                    <td>
                    <span className={`tag ${movie.genre.toLowerCase()}`}>
                        {movie.genre}
                    </span>
                    </td>
                    <td>{movie.year}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.reviews}</td>
                    <td>
                    <button className="btn-primary">+ Add Review</button>
                    <button className="btn-secondary">Add to Watchlist</button>
                    <button>View</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </section>
        </div>
    );
}
export default MovieList;