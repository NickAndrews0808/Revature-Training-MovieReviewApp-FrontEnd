import LoginForm from '../../components/auth/LoginForm';
import './Login.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="welcome-text">
          <h1>Welcome Back!</h1>
          <p>Sign in to continue to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}