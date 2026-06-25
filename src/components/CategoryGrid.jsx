import { useNavigate } from 'react-router-dom';
import { categories } from '../data/configData';
import './CategoryGrid.css';

const CategoryGrid = () => {
  const navigate = useNavigate();

  if (!categories || categories.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className="category-container">
      <h2 className="category-title">Browse Categories</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => navigate(`/search?q=${encodeURIComponent(cat.searchQuery)}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${encodeURIComponent(cat.searchQuery)}`)}
          >
            <img src={cat.image} alt={cat.name} className="category-img" />
            <div className="category-name">{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;