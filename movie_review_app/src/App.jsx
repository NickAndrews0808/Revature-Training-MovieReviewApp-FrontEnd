import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieList from './pages/Movie/MovieList'
import NavLinks from './components/NavLinks'
import MovieDetail from './pages/Movie/MovieDetail'
import './pages/Dashboard/Dashboard.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <header className="dashboard-header">
          <h1>MovieReview</h1>
          <nav>
            <NavLinks />
          </nav>
          <input className="search-bar" placeholder="Search movies..." />
        </header>
      
        <Routes>
          <Route path="/" element={<Navigate to="/Dashboard" replace />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Movielist" element={<MovieList />} />
          <Route path="/MovieDetail/:id" element={<MovieDetail />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
