import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 40, color = '#2874f0' }) => {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size, borderTopColor: color }}
      role="status"
      aria-label="Loading"
    />
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

export default LoadingSpinner;