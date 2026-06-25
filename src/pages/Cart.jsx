import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import './Cart.css';

const Cart = () => {
  const { items: cartItems, removeItem, updateQuantity, getTotalPrice } = useCart();

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
              <div className="cart-items-layout">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-meta">
                        <span className="cart-item-platform">Lowest: {item.platform}</span>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                          View Listing →
                        </a>
                      </div>
                    </div>
                    <div className="cart-item-price-quantity">
                      <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
                      <div className="quantity-controls">
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span className="quantity-val">{item.quantity}</span>
                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="cart-item-remove" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-total">
                  <span>Total:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <button className="checkout-btn" onClick={() => alert('Proceeding to checkout with lowest compared prices!')}>
                  Proceed to Checkout
                </button>
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