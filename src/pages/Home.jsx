import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import TrendingCard from '../components/TrendingCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import { carouselSlides } from '../data/configData';
import translations from '../translations';
import { generateStableId } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  const t = translations[lang] || translations.en;

  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/trending')
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Generate stable, collision-free IDs
          const mapped = data.map((item) => {
            const productWithId = { ...item };
            productWithId.id = generateStableId(productWithId);
            return productWithId;
          });
          setTrending(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load trending products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cheapr – Compare & Save on Amazon & Flipkart India</title>
        <meta name="description" content="Compare product prices between Amazon and Flipkart in real-time. Search mobiles, electronics, apparel, and save money instantly on every purchase!" />
        <meta property="og:title" content="Cheapr – Live Price Comparison Engine" />
        <meta property="og:description" content="Compare product prices between Amazon and Flipkart India in real-time. Find the lowest prices and save money instantly!" />
        <meta property="og:image" content="/icons/icon-512.png" />
        <meta property="og:url" content="https://cheaprr.vercel.app/home" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cheapr – Live Price Comparison Engine" />
        <meta name="twitter:description" content="Compare product prices between Amazon and Flipkart India in real-time. Find the lowest prices and save money instantly!" />
        <meta name="twitter:image" content="/icons/icon-512.png" />
      </Helmet>
      <div className="home">
        <Navbar showSearch={true} />

        <ImageCarousel slides={carouselSlides} autoPlayInterval={4000} />

        <div className="home-content container">
          <CategoryGrid />

          <div className="banner">
            <div>
              <div className="banner-badge">{t.limitedOffer || 'LIMITED TIME OFFER'}</div>
              <div className="banner-title">{t.todaysDeals || "🔥 Today's Top Deals"}</div>
              <div className="banner-sub">{t.bestPrices || 'Best prices across Amazon & Flipkart right now'}</div>
            </div>
            <div className="banner-cta">{t.viewAll || 'View All Deals →'}</div>
          </div>

          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">{t.trending || '🔥 Trending Comparisons'}</h2>
                <p className="section-sub">{t.trendingSub || 'Most searched products right now'}</p>
              </div>
            </div>
            <div className="trending-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                  Loading real-time trending products...
                </div>
              ) : trending.length > 0 ? (
                trending.slice(0, 6).map((product) => (
                  <TrendingCard key={product.id} product={product} />
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                  No trending products available.
                </div>
              )}
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">{t.featured || '⚡ Featured Products'}</h2>
                <p className="section-sub">Compare prices across Amazon & Flipkart</p>
              </div>
            </div>
            <div className="featured-grid">
              {loading ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                  Loading real-time products...
                </div>
              ) : trending.length > 0 ? (
                trending.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px', color: 'var(--text-gray)' }}>
                  No products available.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Footer is now OUTSIDE the container – it will span full width */}
        <Footer />
      </div>
    </>
  );
};

export default Home;