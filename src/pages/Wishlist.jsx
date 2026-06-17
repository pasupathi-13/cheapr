import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Wishlist.css';

const Wishlist = () => {
  // Mock wishlist items
  const wishlistItems = [];

  return (
    <>
      <Helmet><title>Wishlist – Cheapr</title></Helmet>
      <div className="wishlist-page">
        <Navbar showSearch={true} />
        
        <div className="wishlist-container container">
          <h1 className="wishlist-title">❤️ Your Wishlist</h1>

          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty">
              <div className="empty-icon">❤️</div>
              <h2>Wishlist is Empty</h2>
              <p>Save your favorite products here.</p>
              <Link to="/home" className="empty-btn">Browse Products →</Link>
            </div>
          ) : (
            <div className="wishlist-grid">
              {/* Wishlist items will render here */}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Wishlist;