import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routeConstants';
import Login from '../pages/Login/Login';
import OAuth2Redirect from '../pages/OAuth2Redirect/OAuth2Redirect';
import Dashboard from '../pages/Dashboard/Dashboard';
import Profile from '../pages/Profile/Profile';
import { authService } from '../api/services/authService';

// Protected Route Component
function ProtectedRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.OAUTH2_REDIRECT} element={<OAuth2Redirect />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path={ROUTES.USER_PROFILE} 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect root to login or dashboard based on auth */}
        <Route 
          path={ROUTES.HOME} 
          element={
            authService.isAuthenticated() 
              ? <Navigate to="/dashboard" replace /> 
              : <Navigate to={ROUTES.LOGIN} replace />
          } 
        />
        
        {/* 404 */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;