import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import CategoryGrid from '../components/CategoryGrid';
import TrendingCard from '../components/TrendingCard';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import { trendingProducts, carouselSlides } from '../data/mockData';
import translations from '../translations';
import './Home.css';

const Home = () => {
  const lang = localStorage.getItem('preferredLanguage') || 'en';
  const t = translations[lang] || translations.en;

  return (
    <>
      <Helmet>
        <title>Cheapr – Home | Compare & Save</title>
        <meta name="description" content={t.heroSub || 'Find the best deals across Amazon and Flipkart.'} />
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
              <span className="section-seeall">{t.seeAll || 'See all →'}</span>
            </div>
            <div className="trending-grid">
              {trendingProducts.map((product) => (
                <TrendingCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <div>
                <h2 className="section-title">{t.featured || '⚡ All Products'}</h2>
                <p className="section-sub">Compare prices across Amazon & Flipkart</p>
              </div>
            </div>
            <div className="featured-grid">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
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