import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieList from './pages/Movie/MovieList'
import NavLinks from './components/NavLinks'
import MovieDetail from './pages/Movie/MovieDetail'
import './pages/Dashboard/Dashboard.css'
import Reviews from './pages/Review/Reviews'  // Add this import
import { WatchlistProvider } from './pages/Watchlist/WatchlistContext'
import Watchlist from './pages/Watchlist/Watchlist'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { authService } from './api/services/authService.js'

function AppContent() {
  const location = useLocation();
  const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
  
  const noHeaderRoutes = ['/login', '/register'];
  const hideHeader = noHeaderRoutes.includes(location.pathname);
    const logout = () => {
      authService.logout();
      setIsAuthenticated(false);
      //window.location.href = '/login';
      navigate('/login');
    };

  return (
    <>
      {!hideHeader && (
        <header className="dashboard-header">
          <h1>MovieReview</h1>
          <nav>
            <NavLinks />
          </nav>
          <input id="search" className="search-bar" placeholder="Search movies..." />
          <button className='button' onClick={logout}>Logout</button>
          <Link to="/Profile" className='profile-image-link'>
            <img
              src = "/images/Profile.jpg"
              alt='Profile'
              className='profile-image'
            />
          </Link>
          
        </header>
      )}

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/Dashboard" replace />
          </ProtectedRoute>} />
        <Route path="/Profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
        <Route path="/Dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />
        <Route path="/Movielist" element={
          <ProtectedRoute>
            <MovieList />
          </ProtectedRoute>} />
        <Route path="/Moviedetail/:id" element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>} />
        <Route path="/Reviews" element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>} />
          <Route path="/Watchlist" element={
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <WatchlistProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App