import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import './NoResults.css';

const suggestions = ['iPhone 15', 'Samsung S24', 'MacBook Air', 'Sony Headphones', 'OnePlus 12', 'iPad Pro'];

const NoResults = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>No Results Found – Cheapr</title>
        <meta name="description" content="No products found. Try different keywords or browse our suggestions." />
      </Helmet>
      <div className="noresults">
        <Navbar showSearch={true} />

        <div className="noresults-content container">
          <div className="noresults-icon">🔍</div>
          <h2 className="noresults-title">No Results Found</h2>
          <p className="noresults-sub">
            We couldn't find any products matching your search.
            Try different keywords or browse our suggestions below.
          </p>

          <div className="noresults-search">
            <SearchBar />
          </div>

          <div className="noresults-suggestions">
            <p className="suggestions-label">Try searching for:</p>
            <div className="suggestions-grid">
              {suggestions.map((term) => (
                <button
                  key={term}
                  className="suggestion-btn"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <button className="home-btn" onClick={() => navigate('/home')}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NoResults;