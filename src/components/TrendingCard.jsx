import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { formatPrice, isLowest } from '../utils/helpers';
import './TrendingCard.css';

const TrendingCard = ({ product }) => {
  const navigate = useNavigate();
  const amazonIsLowest = isLowest(product.amazon.price, product.flipkart.price);
  const savings = Math.abs(product.amazon.price - product.flipkart.price);

  return (
    <div
      className="trending-card"
      onClick={() => navigate(`/compare/${product.id}`, { state: { product } })}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/compare/${product.id}`, { state: { product } })}
    >
      <img src={product.image} alt={product.name} className="trending-image" />
      <div className="trending-info">
        <h4 className="trending-name">{product.name}</h4>
        <div className="trending-prices">
          <span className="trending-amazon">AMZ: {formatPrice(product.amazon.price)}</span>
          <span className="trending-vs">vs</span>
          <span className="trending-flipkart">FK: {formatPrice(product.flipkart.price)}</span>
        </div>
        {savings > 0 && (
          <div className="trending-savings">
            💰 Save {formatPrice(savings)} on {amazonIsLowest ? 'Amazon' : 'Flipkart'}
          </div>
        )}
      </div>
      <div className="trending-arrow">›</div>
    </div>
  );
};

TrendingCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default TrendingCard;