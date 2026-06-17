import PropTypes from 'prop-types';
import './PriceBadge.css';

const PriceBadge = ({ isLowest }) => {
  if (!isLowest) return null;
  return <div className="badge">✅ LOWEST PRICE</div>;
};

PriceBadge.propTypes = {
  isLowest: PropTypes.bool,
};

export default PriceBadge;