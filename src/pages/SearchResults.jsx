import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { allProducts } from '../data/mockData';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Filter products based on category or name
    const results = allProducts.filter(product => {
      const searchTerm = query.toLowerCase().trim();
      if (!searchTerm) return true;
      return (
        product.category?.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredProducts(results);
    setLoading(false);
  }, [query]);

  if (loading) {
    return (
      <div className="search-results">
        <Navbar showSearch={true} />
        <div className="results-loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Search Results for "{query}" – Cheapr</title>
        <meta name="description" content={`Showing results for "${query}" – Compare prices across Amazon & Flipkart.`} />
      </Helmet>
      <div className="search-results">
        <Navbar showSearch={true} />

        <div className="results-header">
          <div className="results-header-content">
            <p className="results-query">
              Showing results for <span>"{query}"</span>
            </p>
            <p className="results-count">
              {filteredProducts.length} products compared across Amazon & Flipkart
            </p>
          </div>
        </div>

        <div className="results-grid container">
          {filteredProducts.length > 0 ? (
            <div className="results-grid-items">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="results-empty">
              <div className="empty-icon">🔍</div>
              <h2 className="empty-title">No results found</h2>
              <p className="empty-sub">
                We couldn't find any products matching "{query}". Try a different category or search term.
              </p>
              <button className="empty-btn" onClick={() => navigate('/home')}>
                Browse All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;