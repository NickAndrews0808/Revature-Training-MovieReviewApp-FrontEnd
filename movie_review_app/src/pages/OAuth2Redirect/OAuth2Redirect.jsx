import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../api/services/authService';
import { ROUTES } from '../../constants/routeConstants';
import './OAuth2Redirect.css';

export default function OAuth2Redirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        if (error) {
          setError(`Authentication failed: ${error}`);
          setLoading(false);
          setTimeout(() => navigate(ROUTES.LOGIN), 3000);
          return;
        }

        if (!code) {
          setError('No authorization code received');
          setLoading(false);
          setTimeout(() => navigate(ROUTES.LOGIN), 3000);
          return;
        }

        // Send code to backend for verification
        await authService.handleGoogleCallback(code, state);
        
        // Redirect to dashboard on success
        navigate('/dashboard');
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err.message || 'Authentication failed');
        setLoading(false);
        setTimeout(() => navigate(ROUTES.LOGIN), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="oauth-redirect-page">
      <div className="oauth-redirect-container">
        {loading ? (
          <>
            <div className="spinner"></div>
            <h2>Authenticating...</h2>
            <p>Please wait while we complete your login</p>
          </>
        ) : (
          <>
            <div className="error-icon">⚠️</div>
            <h2>Authentication Error</h2>
            <p>{error}</p>
            <p className="redirect-message">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  );
}