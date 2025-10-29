import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/AppRoutes';
import './App.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);