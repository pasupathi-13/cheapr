import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import PriceBadge from '../components/PriceBadge';
import { formatPrice, getDiscount, isLowest, API_URL } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Compare.css';

const Compare = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Try to load product from navigation state, otherwise fall back to cached product in localStorage
  const product = location.state?.product || (() => {
    try {
      const cached = localStorage.getItem('lastComparedProduct');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  })();

  const [activeImage, setActiveImage] = useState(product ? product.image : '');
  const [images, setImages] = useState(product ? [product.image] : []);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (!product) return;
    
    // Save to localStorage to persist across refreshes
    try {
      localStorage.setItem('lastComparedProduct', JSON.stringify(product));
    } catch (e) {
      console.warn("Could not save compared product to local storage:", e);
    }

    setLoadingImages(true);
    const amazonUrl = product.amazon.link || '';
    const flipkartUrl = product.flipkart.link || '';

    fetch(`${API_URL}/api/product?amazonUrl=${encodeURIComponent(amazonUrl)}&flipkartUrl=${encodeURIComponent(flipkartUrl)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load images');
        return res.json();
      })
      .then(data => {
        if (data.images && data.images.length > 0) {
          const uniqueImages = [...new Set([product.image, ...data.images])].filter(Boolean);
          setImages(uniqueImages);
          setActiveImage(uniqueImages[0]);
        }
      })
      .catch(err => {
        console.warn("Could not scrape actual images, keeping standard gallery:", err);
      })
      .finally(() => {
        setLoadingImages(false);
      });
  }, [product]);

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

  const amazonIsLowest = product.amazon.price !== null && (product.flipkart.price === null || product.amazon.price < product.flipkart.price);
  const flipkartIsLowest = product.flipkart.price !== null && (product.amazon.price === null || product.flipkart.price < product.amazon.price);
  const hasBothPrices = product.amazon.price !== null && product.flipkart.price !== null;
  const savings = hasBothPrices ? Math.abs(product.amazon.price - product.flipkart.price) : 0;

  const rows = [
    { label: '💰 Price', amazon: formatPrice(product.amazon.price), flipkart: formatPrice(product.flipkart.price), highlight: true },
    { label: '🏷️ Original Price', amazon: formatPrice(product.amazon.originalPrice), flipkart: formatPrice(product.flipkart.originalPrice), highlight: false },
    { label: '📉 Discount', amazon: `${getDiscount(product.amazon.originalPrice, product.amazon.price)}% off`, flipkart: `${getDiscount(product.flipkart.originalPrice, product.flipkart.price)}% off`, highlight: false },
    { label: '⭐ Rating', amazon: product.amazon.rating ? `${product.amazon.rating} / 5` : 'N/A', flipkart: product.flipkart.rating ? `${product.flipkart.rating} / 5` : 'N/A', highlight: false },
    { label: '💬 Reviews', amazon: product.amazon.reviews ? product.amazon.reviews.toLocaleString() : 'N/A', flipkart: product.flipkart.reviews ? product.flipkart.reviews.toLocaleString() : 'N/A', highlight: false },
    { label: '🚚 Delivery', amazon: product.amazon.delivery, flipkart: product.flipkart.delivery, highlight: false },
  ];

  const { addItem: addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const lowestPrice = Math.min(
    product.amazon.price !== null ? product.amazon.price : Infinity,
    product.flipkart.price !== null ? product.flipkart.price : Infinity
  );

  const lowestPlatform = product.amazon.price !== null && (product.flipkart.price === null || product.amazon.price <= product.flipkart.price) ? 'Amazon' : 'Flipkart';
  const purchaseLink = lowestPlatform === 'Amazon' ? product.amazon.link : product.flipkart.link;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: lowestPrice,
      platform: lowestPlatform,
      link: purchaseLink
    });
  };

  const handleAddToWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <>
      <Helmet>
        <title>Compare {product.name} Price on Amazon & Flipkart – Cheapr</title>
        <meta name="description" content={`Compare prices for ${product.name} across Amazon India and Flipkart in real-time. Buy from the cheapest store and save big!`} />
        <meta property="og:title" content={`Compare ${product.name} Price – Cheapr`} />
        <meta property="og:description" content={`Compare live prices for ${product.name} across Amazon India and Flipkart. Find the best deal and save.`} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://cheaprr.vercel.app/compare/${product.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Compare ${product.name} Price – Cheapr`} />
        <meta name="twitter:description" content={`Compare live prices for ${product.name} across Amazon India and Flipkart.`} />
        <meta name="twitter:image" content={product.image} />
      </Helmet>
      <div className="compare">
        <Navbar showSearch={true} />

        <div className="compare-container container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          <div className="compare-product-showcase">
            <div className="compare-gallery-container">
              <div className="gallery-main-wrapper">
                <img src={activeImage} alt={product.name} className="compare-main-img" />
              </div>
              <div className="gallery-thumbnails">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumbnail-wrapper ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                    onMouseEnter={() => setActiveImage(img)}
                  >
                    <img src={img} alt={`view-${idx}`} className="compare-thumb-img" />
                  </div>
                ))}
              </div>
            </div>

            <div className="compare-details-showcase">
              <h1 className="compare-title">{product.name}</h1>
              {savings > 0 && (
                <div className="compare-savings">
                  💰 Save {formatPrice(savings)} on {amazonIsLowest ? 'Amazon' : 'Flipkart'}
                </div>
              )}

              <div className="quick-specs">
                <span className="spec-badge">⚡ Live Deal</span>
                <span className="spec-badge">🛡️ Verified Comparison</span>
                <span className="spec-badge font-success">⭐ {product.amazon.rating || product.flipkart.rating || '4.5'} Rating</span>
              </div>
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
                <div className={`table-value ${row.highlight && flipkartIsLowest ? 'lowest' : ''}`}>
                  {row.flipkart}
                  {row.highlight && flipkartIsLowest && <span className="lowest-badge">✅ LOWEST</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="compare-buy">
            <button
              onClick={() => product.amazon.price !== null && window.open(product.amazon.link, '_blank')}
              className={`buy-amazon ${product.amazon.price === null ? 'disabled' : ''}`}
              disabled={product.amazon.price === null}
            >
              {product.amazon.price === null ? 'Not Available' : 'Buy on Amazon'}
              <span>{formatPrice(product.amazon.price)}</span>
            </button>
            <button
              onClick={() => product.flipkart.price !== null && window.open(product.flipkart.link, '_blank')}
              className={`buy-flipkart ${product.flipkart.price === null ? 'disabled' : ''}`}
              disabled={product.flipkart.price === null}
            >
              {product.flipkart.price === null ? 'Not Available' : 'Buy on Flipkart'}
              <span>{formatPrice(product.flipkart.price)}</span>
            </button>
          </div>

          {/* ✅ Cart & Wishlist buttons – only here, not on cards */}
          <div className="compare-actions">
            <button className={`compare-cart-btn ${isInCart(product.id) ? 'active' : ''}`} onClick={handleAddToCart}>
              {isInCart(product.id) ? '🛒 In Cart' : '🛒 Add to Cart'}
            </button>
            <button className={`compare-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`} onClick={handleAddToWishlist}>
              {isInWishlist(product.id) ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;