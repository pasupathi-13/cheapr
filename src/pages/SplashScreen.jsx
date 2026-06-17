import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Cheapr – Compare & Save</title>
        <meta name="description" content="Compare prices between Amazon and Flipkart. Find the best deals." />
      </Helmet>
      <div className="splash">
        <div className="splash-logo">
          Cheap<span>r</span>
        </div>
        <div className="splash-tagline">Compare prices. Save money. 💰</div>
        <div className="splash-platforms">
          <span className="platform-badge">amazon</span>
          <span className="platform-badge">flipkart</span>
        </div>
        <div className="splash-dots">
          {[0, 1, 2].map((i) => (
            <div key={i} className="dot" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SplashScreen;