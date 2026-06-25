import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaShoppingCart, FaHeart, FaUser, FaHome, FaGlobe, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import translations from '../translations';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './Navbar.css';

const Navbar = ({ showSearch = true }) => {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(() => {
    return localStorage.getItem('preferredLanguage') || 'en';
  });
  const navigate = useNavigate();

  const t = translations[selectedLang] || translations.en;

  // Context counts
  const [user, setUser] = useState(null);
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  
  const cartCount = getTotalItems();
  const wishlistCount = wishlistItems.length;

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setLangOpen(false);
  };
  const closeMenu = () => setMenuOpen(false);

  const toggleLang = () => setLangOpen(!langOpen);

  const selectLang = (code) => {
    setSelectedLang(code);
    setLangOpen(false);
    localStorage.setItem('preferredLanguage', code);
    window.location.reload();
  };

  const currentLang = languages.find(l => l.code === selectedLang) || languages[0];

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo – hardcoded to avoid double 'r' */}
        <Link to="/home" className="logo" onClick={closeMenu}>
          Cheap<span>r</span>
        </Link>

        {/* Search Bar */}
        {showSearch && (
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder || 'Search products...'}
              className="search-input"
              aria-label="Search products"
            />
            <button type="submit" className="search-btn" aria-label="Submit search">
              🔍
            </button>
          </form>
        )}

        {/* Right Side */}
        <div className="nav-right">
          {/* Language Selector */}
          <div className="lang-selector desktop-only">
            <button className="lang-toggle" onClick={toggleLang} aria-label="Select language">
              <FaGlobe className="lang-icon" />
              <span className="lang-label">{currentLang.flag} {currentLang.label}</span>
              <span className="lang-arrow">▾</span>
            </button>
            {langOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`lang-option ${selectedLang === lang.code ? 'active' : ''}`}
                    onClick={() => selectLang(lang.code)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-name">{lang.label}</span>
                    {selectedLang === lang.code && <span className="lang-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Home Link */}
          <Link to="/home" className="nav-link nav-home desktop-only" onClick={closeMenu}>
            <FaHome className="nav-icon-home" />
            <span>{t.home || 'Home'}</span>
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="nav-icon" onClick={closeMenu} aria-label={t.wishlist || 'Wishlist'}>
            <FaHeart className="icon-heart" />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="nav-icon cart-icon" onClick={closeMenu} aria-label={t.cart || 'Cart'}>
            <FaShoppingCart className="icon-cart" />
            {cartCount > 0 && <span className="badge cart-badge">{cartCount}</span>}
          </Link>

          {/* User / Login */}
          {user ? (
            <div className="nav-user desktop-only">
              <FaUser className="user-icon" />
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={() => { setUser(null); closeMenu(); }}>
                {t.logout || 'Logout'}
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link desktop-only" onClick={closeMenu}>
              <FaUser className="icon-user" />
              {t.login || 'Login'}
            </Link>
          )}

          {/* Hamburger */}
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <HiX className="hamburger-icon" /> : <HiMenu className="hamburger-icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-header">
            <h3>{t.menu || 'Menu'}</h3>
            <button className="mobile-close-btn-header" onClick={closeMenu}>
              <HiX />
            </button>
          </div>

          <div className="mobile-lang-section">
            <div className="mobile-lang-label">
              <FaGlobe className="mobile-link-icon" />
              <span>{t.language || 'Language'}</span>
            </div>
            <div className="mobile-lang-options">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`mobile-lang-option ${selectedLang === lang.code ? 'active' : ''}`}
                  onClick={() => { selectLang(lang.code); closeMenu(); }}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">{lang.label}</span>
                  {selectedLang === lang.code && <span className="lang-check">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {user ? (
            <div className="mobile-user">
              <FaUser className="mobile-user-icon" />
              <span className="mobile-user-name">{user.name}</span>
              <button className="mobile-logout-btn" onClick={() => { setUser(null); closeMenu(); }}>
                {t.logout || 'Logout'}
              </button>
            </div>
          ) : (
            <Link to="/login" className="mobile-link" onClick={closeMenu}>
              <FaUser className="mobile-link-icon" />
              {t.login || 'Login'} / {t.signUp || 'Sign Up'}
            </Link>
          )}

          <Link to="/home" className="mobile-link" onClick={closeMenu}>
            <FaHome className="mobile-link-icon" />
            {t.home || 'Home'}
          </Link>
          <Link to="/about" className="mobile-link" onClick={closeMenu}>
            <FaInfoCircle className="mobile-link-icon" />
            {t.about || 'About'}
          </Link>
          <Link to="/contact" className="mobile-link" onClick={closeMenu}>
            <FaEnvelope className="mobile-link-icon" />
            {t.contact || 'Contact'}
          </Link>
          <Link to="/wishlist" className="mobile-link" onClick={closeMenu}>
            <FaHeart className="mobile-link-icon" />
            {t.wishlist || 'Wishlist'}
            {wishlistCount > 0 && <span className="mobile-badge">{wishlistCount}</span>}
          </Link>
           <Link to="/cart" className="mobile-link" onClick={closeMenu}>
            <FaShoppingCart className="mobile-link-icon" />
            {t.cart || 'Cart'}
            {cartCount > 0 && <span className="mobile-badge">{cartCount}</span>}
          </Link>

          {/* Download App */}
          <Link to="/download" className="mobile-link mobile-download-link" onClick={closeMenu}>
            <span className="mobile-link-icon">📲</span>
            {t.downloadApp || 'Download App'}
            <span className="mobile-download-badge">FREE</span>
          </Link>

          <button className="mobile-close-btn" onClick={closeMenu}>
            {t.close || 'Close Menu'}
          </button>
        </div>
      </div>

      {menuOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </nav>
  );
};

Navbar.propTypes = {
  showSearch: PropTypes.bool,
};

export default Navbar;