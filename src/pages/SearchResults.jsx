import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { generateStableId } from '../utils/helpers';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('API server returned error');
        }
        return res.json();
      })
      .then((data) => {
        const mapped = (data.products || []).map((item) => {
          const productWithId = { ...item };
          productWithId.id = generateStableId(productWithId);
          return productWithId;
        });
        setFilteredProducts(mapped);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Could not load live comparison:", err);
        setError("Scraper server is currently offline. Please run 'npm start' in the backend directory.");
        setFilteredProducts([]);
        setLoading(false);
      });
  }, [query]);

  if (loading) {
    return (
      <div className="search-results">
        <Navbar showSearch={true} />
        <div className="results-loading-container">
          <div className="orbit-spinner">
            <div className="orbit-center">🔍</div>
            <div className="orbit orbit-amazon"></div>
            <div className="orbit orbit-flipkart"></div>
          </div>
          <div className="scanner-line"></div>
          <div className="loading-status-pill">Comparing Prices...</div>
        </div>
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