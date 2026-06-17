import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';

const Login = () => {
  const handleGoogleLogin = () => {
    // Mock Google login - replace with real Google OAuth later
    alert('Google Sign-In will be implemented soon!');
  };

  return (
    <>
      <Helmet><title>Login – Cheapr</title></Helmet>
      <div className="login-page">
        <Navbar showSearch={false} />
        
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1>Welcome to Cheapr</h1>
              <p>Sign in to access your cart and wishlist</p>
            </div>

            <button className="google-btn" onClick={handleGoogleLogin}>
              <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google" 
                className="google-icon"
              />
              Sign in with Google
            </button>

            <div className="login-divider">
              <span>or</span>
            </div>

            <form className="login-form">
              <input
                type="email"
                placeholder="Email address"
                className="login-input"
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
              />
              <button type="submit" className="login-btn">Sign In</button>
            </form>

            <p className="login-footer">
              Don't have an account? <a href="#">Sign up</a>
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Login;