import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './About.css';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us – Cheapr</title>
        <meta name="description" content="Cheapr helps you compare prices between Amazon and Flipkart to find the best deals." />
      </Helmet>
      <div className="about-page">
        <Navbar showSearch={true} />
        
        <div className="about-container container">
          <h1 className="about-title">About Cheapr</h1>
          
          <div className="about-content">
            <section className="about-section">
              <h2>What is Cheapr?</h2>
              <p>
                Cheapr is a price comparison platform that helps you find the best deals 
                across India's two largest e-commerce platforms – <strong>Amazon</strong> and <strong>Flipkart</strong>.
              </p>
              <p>
                Our mission is simple: <strong>save you money and time</strong> by showing you 
                where to buy any product at the lowest price.
              </p>
            </section>

            <section className="about-section">
              <h2>How It Works</h2>
              <ol className="about-steps">
                <li>
                  <span className="step-number">1</span>
                  <span className="step-text">Search for any product (phones, laptops, TVs, etc.)</span>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <span className="step-text">We instantly compare prices from Amazon and Flipkart</span>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <span className="step-text">You see both prices side-by-side with the cheapest option highlighted</span>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <span className="step-text">Click "Buy" and go directly to the store to purchase</span>
                </li>
              </ol>
            </section>

            <section className="about-section">
              <h2>Why Choose Cheapr?</h2>
              <div className="about-features">
                <div className="feature-item">
                  <span className="feature-icon">💰</span>
                  <div>
                    <h3>Save Money</h3>
                    <p>Find the lowest price before you buy</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⏱️</span>
                  <div>
                    <h3>Save Time</h3>
                    <p>No need to open multiple tabs to compare</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🛡️</span>
                  <div>
                    <h3>Trusted Sources</h3>
                    <p>We only show prices from Amazon & Flipkart</p>
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📱</span>
                  <div>
                    <h3>Mobile Friendly</h3>
                    <p>Compare prices on any device</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-section">
              <h2>Our Commitment</h2>
              <p>
                We are committed to providing accurate, real-time price comparisons 
                to help you make informed purchasing decisions. We are an <strong>affiliate partner</strong> 
                of Amazon and Flipkart, which means we earn a small commission 
                when you make a purchase through our links – at no extra cost to you.
              </p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;