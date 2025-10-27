import { Link } from 'react-router-dom';
import './Dashboard.css'
import NavLinks from '../../components/NavLinks';
function Dashboard(){
    return (
        <div className="dashboard">
        <header className="dashboard-header">
            <h1>MovieReview</h1>
            <nav>
            <NavLinks />
            </nav>
            <input className="search-bar" placeholder="Search movies..." />
        </header>

        <section className="stats-section">
            <div className="stat-card">
            <p>Total Reviews</p>
            <h2>342</h2>
            <span className="positive">+28</span>
            </div>
            <div className="stat-card">
            <p>Movies Watched</p>
            <h2>156</h2>
            <span className="positive">+12</span>
            </div>
            <div className="stat-card">
            <p>Watchlist Items</p>
            <h2>47</h2>
            <span className="negative">-5</span>
            </div>
        </section>

        <section className="popular-movies">
            <h3>Popular Movies</h3>
            <p>Browse and review the latest movies</p>
            <table>
            <thead>
                <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Year</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td><img src="/poster1.jpg" alt="Poster" /></td>
                <td>The Quantum Paradox</td>
                <td><span className="tag sci-fi">Sci-Fi</span></td>
                <td>2024</td>
                <td>⭐ 4.5</td>
                <td>1,247</td>
                <td>
                    <button className="btn-primary">+ Add Review</button>
                    <button className="btn-secondary">Add to Watchlist</button>
                </td>
                </tr>
            </tbody>
            </table>
        </section>
        </div>
    );
}
export default Dashboard;