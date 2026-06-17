import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import PriceBadge from '../components/PriceBadge';
import { trendingProducts, searchMockResults } from '../data/mockData';
import { formatPrice, getDiscount, isLowest } from '../utils/helpers';
import './Compare.css';

const Compare = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allProducts = [...trendingProducts, ...searchMockResults];
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="compare-notfound">
        <Navbar />
        <div className="notfound-content">
          <div className="notfound-icon">😕</div>
          <h2 className="notfound-title">Product not found</h2>
          <button className="notfound-btn" onClick={() => navigate('/home')}>
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const amazonIsLowest = isLowest(product.amazon.price, product.flipkart.price);
  const savings = Math.abs(product.amazon.price - product.flipkart.price);

  const rows = [
    { label: '💰 Price', amazon: formatPrice(product.amazon.price), flipkart: formatPrice(product.flipkart.price), highlight: true },
    { label: '🏷️ Original Price', amazon: formatPrice(product.amazon.originalPrice), flipkart: formatPrice(product.flipkart.originalPrice), highlight: false },
    { label: '📉 Discount', amazon: `${getDiscount(product.amazon.originalPrice, product.amazon.price)}% off`, flipkart: `${getDiscount(product.flipkart.originalPrice, product.flipkart.price)}% off`, highlight: false },
    { label: '⭐ Rating', amazon: `${product.amazon.rating} / 5`, flipkart: `${product.flipkart.rating} / 5`, highlight: false },
    { label: '💬 Reviews', amazon: product.amazon.reviews.toLocaleString(), flipkart: product.flipkart.reviews.toLocaleString(), highlight: false },
    { label: '🚚 Delivery', amazon: product.amazon.delivery, flipkart: product.flipkart.delivery, highlight: false },
  ];

  // UI-only handlers (replace with real logic later)
  const handleAddToCart = () => alert('🛒 Added to Cart (UI only)');
  const handleAddToWishlist = () => alert('❤️ Added to Wishlist (UI only)');

  return (
    <>
      <Helmet>
        <title>{product.name} – Price Comparison | Cheapr</title>
        <meta name="description" content={`Compare prices for ${product.name} on Amazon and Flipkart. Find the best deal.`} />
      </Helmet>
      <div className="compare">
        <Navbar showSearch={true} />

        <div className="compare-container container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="compare-header">
            <img src={product.image} alt={product.name} className="compare-img" />
            <div>
              <h1 className="compare-title">{product.name}</h1>
              {savings > 0 && (
                <div className="compare-savings">
                  💰 Save {formatPrice(savings)} on {amazonIsLowest ? 'Amazon' : 'Flipkart'}
                </div>
              )}
            </div>
          </div>

          <div className="compare-table">
            <div className="table-header">
              <div className="table-feature">Feature</div>
              <div className="table-amazon">Amazon</div>
              <div className="table-flipkart">Flipkart</div>
            </div>

            {rows.map((row, index) => (
              <div key={index} className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="table-feature">{row.label}</div>
                <div className={`table-value ${row.highlight && amazonIsLowest ? 'lowest' : ''}`}>
                  {row.amazon}
                  {row.highlight && amazonIsLowest && <span className="lowest-badge">✅ LOWEST</span>}
                </div>
                <div className={`table-value ${row.highlight && !amazonIsLowest ? 'lowest' : ''}`}>
                  {row.flipkart}
                  {row.highlight && !amazonIsLowest && <span className="lowest-badge">✅ LOWEST</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="compare-buy">
            <button onClick={() => window.open(product.amazon.link, '_blank')} className="buy-amazon">
              Buy on Amazon
              <span>{formatPrice(product.amazon.price)}</span>
            </button>
            <button onClick={() => window.open(product.flipkart.link, '_blank')} className="buy-flipkart">
              Buy on Flipkart
              <span>{formatPrice(product.flipkart.price)}</span>
            </button>
          </div>

          {/* ✅ Cart & Wishlist buttons – only here, not on cards */}
          <div className="compare-actions">
            <button className="compare-cart-btn" onClick={handleAddToCart}>
              🛒 Add to Cart
            </button>
            <button className="compare-wishlist-btn" onClick={handleAddToWishlist}>
              🤍 Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;