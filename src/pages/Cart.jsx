import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Cart.css';

const Cart = () => {
  // Mock cart items (replace with real data later)
  const cartItems = [];

  return (
    <>
      <Helmet><title>Cart – Cheapr</title></Helmet>
      <div className="cart-page">
        <Navbar showSearch={true} />
        
        <div className="cart-container container">
          <h1 className="cart-title">🛒 Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-icon">🛒</div>
              <h2>Your Cart is Empty</h2>
              <p>Start shopping to add items to your cart.</p>
              <Link to="/home" className="empty-btn">Continue Shopping →</Link>
            </div>
          ) : (
            <div className="cart-items">
              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>₹0</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Cart;