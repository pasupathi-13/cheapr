import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PriceBadge from './PriceBadge';
import { formatPrice, getDiscount, isLowest, generateStableId } from '../utils/helpers';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const hasBothPrices = product.amazon.price !== null && product.flipkart.price !== null;
  const amazonIsLowest = hasBothPrices ? isLowest(product.amazon.price, product.flipkart.price) : false;
  const flipkartIsLowest = hasBothPrices ? isLowest(product.flipkart.price, product.amazon.price) : false;
  const savings = hasBothPrices ? Math.abs(product.amazon.price - product.flipkart.price) : 0;

  const productId = product.id || generateStableId(product);
  const wishlisted = isInWishlist(productId);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist({ ...product, id: productId });
  };

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/compare/${productId}`, { state: { product: { ...product, id: productId } } })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/compare/${productId}`, { state: { product: { ...product, id: productId } } })}
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        <button
          className={`card-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        {savings > 0 && (
          <div className="product-savings">💰 Save {formatPrice(savings)} by choosing wisely!</div>
        )}
        <div className="product-platforms">
          <div className={`platform ${product.amazon.price === null ? 'unavailable' : ''}`}>
            <div className="platform-header">
              <span className="amazon-label">Amazon</span>
              {product.amazon.price !== null && <PriceBadge isLowest={amazonIsLowest} />}
            </div>
            {product.amazon.price !== null ? (
              <>
                <div className="platform-price">{formatPrice(product.amazon.price)}</div>
                <div className="platform-original">{formatPrice(product.amazon.originalPrice)}</div>
                <div className="platform-discount">{getDiscount(product.amazon.originalPrice, product.amazon.price)}% off</div>
                <div className="platform-rating">⭐ {product.amazon.rating} ({product.amazon.reviews.toLocaleString()})</div>
              </>
            ) : (
              <div className="platform-not-sold">Product Not Sold Here</div>
            )}
          </div>
          <div className={`platform ${product.flipkart.price === null ? 'unavailable' : ''}`}>
            <div className="platform-header">
              <span className="flipkart-label">Flipkart</span>
              {product.flipkart.price !== null && <PriceBadge isLowest={flipkartIsLowest} />}
            </div>
            {product.flipkart.price !== null ? (
              <>
                <div className="platform-price">{formatPrice(product.flipkart.price)}</div>
                <div className="platform-original">{formatPrice(product.flipkart.originalPrice)}</div>
                <div className="platform-discount">{getDiscount(product.flipkart.originalPrice, product.flipkart.price)}% off</div>
                <div className="platform-rating">⭐ {product.flipkart.rating} ({product.flipkart.reviews.toLocaleString()})</div>
              </>
            ) : (
              <div className="platform-not-sold">Product Not Sold Here</div>
            )}
          </div>
        </div>
        <div className="product-actions">
          {product.amazon.price !== null ? (
            <a
              href={product.amazon.link}
              target="_blank"
              rel="noopener noreferrer"
              className="amazon-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Buy on Amazon
            </a>
          ) : (
            <button className="amazon-btn disabled" disabled onClick={(e) => e.stopPropagation()}>
              Not Available
            </button>
          )}
          {product.flipkart.price !== null ? (
            <a
              href={product.flipkart.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flipkart-btn"
              onClick={(e) => e.stopPropagation()}
            >
              Buy on Flipkart
            </a>
          ) : (
            <button className="flipkart-btn disabled" disabled onClick={(e) => e.stopPropagation()}>
              Not Available
            </button>
          )}
        </div>

        <button
          className="detail-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/compare/${productId}`, { state: { product: { ...product, id: productId } } }); }}
        >
          📊 Detailed Compare
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;