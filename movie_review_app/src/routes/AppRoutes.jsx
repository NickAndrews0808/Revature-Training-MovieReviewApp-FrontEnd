import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routeConstants';
import Login from '../pages/Login/Login';
import OAuth2Redirect from '../pages/OAuth2Redirect/OAuth2Redirect';
// import Dashboard from '../pages/Dashboard/Dashboard';
// import Profile from '../pages/Profile/Profile';
// import NotFound from '../pages/NotFound/NotFound';

function AppRoutes() {
  const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to login */}
        <Route 
          path={ROUTES.HOME} 
          element={<Navigate to={ROUTES.LOGIN} replace />} 
        />
        
        {/* Login route */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        
        {/* OAuth2 redirect callback */}
        <Route path={ROUTES.OAUTH2_REDIRECT} element={<OAuth2Redirect />} />
        
        {/* Protected routes */}
        {/* <Route 
          path="/dashboard" 
          element={isAuthenticated() ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />} 
        />
        
        <Route 
          path={ROUTES.USER_PROFILE} 
          element={isAuthenticated() ? <Profile /> : <Navigate to={ROUTES.LOGIN} />} 
        /> */}
        
        {/* 404 */}
        {/* <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTES.NOT_FOUND} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;