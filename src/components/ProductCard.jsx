import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import PriceBadge from './PriceBadge';
import { formatPrice, getDiscount, isLowest } from '../utils/helpers';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const amazonIsLowest = isLowest(product.amazon.price, product.flipkart.price);
  const flipkartIsLowest = isLowest(product.flipkart.price, product.amazon.price);
  const savings = Math.abs(product.amazon.price - product.flipkart.price);

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/compare/${product.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/compare/${product.id}`)}
    >
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
      </div>
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        {savings > 0 && (
          <div className="product-savings">💰 Save {formatPrice(savings)} by choosing wisely!</div>
        )}
        <div className="product-platforms">
          <div className="platform">
            <div className="platform-header">
              <span className="amazon-label">Amazon</span>
              <PriceBadge isLowest={amazonIsLowest} />
            </div>
            <div className="platform-price">{formatPrice(product.amazon.price)}</div>
            <div className="platform-original">{formatPrice(product.amazon.originalPrice)}</div>
            <div className="platform-discount">{getDiscount(product.amazon.originalPrice, product.amazon.price)}% off</div>
            <div className="platform-rating">⭐ {product.amazon.rating} ({product.amazon.reviews})</div>
          </div>
          <div className="platform">
            <div className="platform-header">
              <span className="flipkart-label">Flipkart</span>
              <PriceBadge isLowest={flipkartIsLowest} />
            </div>
            <div className="platform-price">{formatPrice(product.flipkart.price)}</div>
            <div className="platform-original">{formatPrice(product.flipkart.originalPrice)}</div>
            <div className="platform-discount">{getDiscount(product.flipkart.originalPrice, product.flipkart.price)}% off</div>
            <div className="platform-rating">⭐ {product.flipkart.rating} ({product.flipkart.reviews})</div>
          </div>
        </div>
        <div className="product-actions">
          <a
            href={product.amazon.link}
            target="_blank"
            rel="noopener noreferrer"
            className="amazon-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Buy on Amazon
          </a>
          <a
            href={product.flipkart.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flipkart-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Buy on Flipkart
          </a>
        </div>

        <button
          className="detail-btn"
          onClick={(e) => { e.stopPropagation(); navigate(`/compare/${product.id}`); }}
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