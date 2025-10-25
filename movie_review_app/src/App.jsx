import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from "./Dashboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <header>
      <h1>Navigate Test</h1>
      <nav>
        <Dashboard />
      </nav>
    </header>
    
    </BrowserRouter> 
  );
}

export default App
