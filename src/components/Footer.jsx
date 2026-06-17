import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Logo & Tagline */}
        <div className="footer-left">
          <Link to="/home" className="footer-logo">
            Cheap<span>r</span>
          </Link>
          <span className="footer-tagline">Compare & Save on every purchase</span>
        </div>

        {/* Center: Links */}
        <div className="footer-links">
          <Link to="/home">Home</Link>
          <span className="footer-divider">|</span>
          <Link to="/about">About</Link>
          <span className="footer-divider">|</span>
          <Link to="/contact">Contact</Link>
          <span className="footer-divider">|</span>
          <Link to="/privacy">Privacy</Link>
          <span className="footer-divider">|</span>
          <Link to="/disclaimer">Disclaimer</Link>
        </div>

        {/* Right: Disclaimers */}
        <div className="footer-right">
          <p className="disclaimer-text">We earn affiliate commission from purchases</p>
          <p className="disclaimer-text">Amazon Associate &amp; Flipkart Affiliate – Prices may vary</p>
          <p className="copyright">© {new Date().getFullYear()} Cheapr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;