import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieList from './pages/MovieList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <header>
      <h4>Home</h4>
      <nav>
        <Link to="/Profile">Profile</Link> | <Link to="/Dashboard">Dashboard</Link> | <Link to="/Movielist">Movielist</Link>
      </nav>
      </header>
      
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Movielist" element={<MovieList />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
