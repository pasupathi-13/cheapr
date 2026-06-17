import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const popularSearches = ['iPhone 15', 'Samsung S24', 'MacBook Air', 'Sony Headphones', 'OnePlus 12'];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="search-wrapper">
      <form className="search-form-hero" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search and compare prices..."
          className="search-input-hero"
          aria-label="Search"
        />
        <button type="submit" className="search-btn-hero">🔍 Search</button>
      </form>

      <div className="popular-searches">
        <span className="popular-label">Popular:</span>
        {popularSearches.map((term) => (
          <button
            key={term}
            className="popular-btn"
            onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar; 