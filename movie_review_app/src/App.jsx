import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieList from './pages/Movie/MovieList'
import NavLinks from './components/NavLinks'
import MovieDetail from './pages/Movie/MovieDetail'
import './pages/Dashboard/Dashboard.css'
import Reviews from './pages/Review/Reviews'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

function AppContent() {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/register'];
  const hideHeader = noHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeader && (
        <header className="dashboard-header">
          <h1>MovieReview</h1>
          <nav>
            <NavLinks />
          </nav>
          <input className="search-bar" placeholder="Search movies..." />
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
        <Route path="/MovieDetail/:id" element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>} />
        <Route path="/Reviews" element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App