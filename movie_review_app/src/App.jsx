import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Profile from './pages/Profile/Profile'
import Dashboard from './pages/Dashboard/Dashboard'
import MovieList from './pages/Movie/MovieList'
import NavLinks from './components/NavLinks'
import MovieDetail from './pages/Movie/MovieDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <header>
      <h4>Home</h4>
        <NavLinks />
      </header>
      
      <Routes>
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
