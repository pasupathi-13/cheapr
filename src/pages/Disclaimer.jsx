import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Disclaimer.css';

const Disclaimer = () => {
  return (
    <>
      <Helmet>
        <title>Disclaimer – Cheapr</title>
        <meta name="description" content="Cheapr's affiliate disclaimer. Learn about our affiliate relationships with Amazon and Flipkart." />
      </Helmet>
      <div className="disclaimer-page">
        <Navbar showSearch={true} />
        
        <div className="disclaimer-container container">
          <h1 className="disclaimer-title">Disclaimer</h1>
          
          <div className="disclaimer-content">
            <div className="disclaimer-box">
              <span className="disclaimer-icon">ℹ️</span>
              <h3>Affiliate Disclosure</h3>
              <p>
                <strong>We earn affiliate commission from purchases</strong> made through our links.
              </p>
            </div>

            <section>
              <h2>Amazon Affiliate Disclaimer</h2>
              <p>
                Cheapr is a participant in the Amazon Services LLC Associates Program, an affiliate 
                advertising program designed to provide a means for sites to earn advertising fees 
                by advertising and linking to Amazon.in. As an Amazon Associate, we earn from 
                qualifying purchases.
              </p>
              <p>
                Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
              </p>
            </section>

            <section>
              <h2>Flipkart Affiliate Disclaimer</h2>
              <p>
                Cheapr is a participant in the Flipkart Affiliate Program. As a Flipkart affiliate, 
                we earn a commission on qualifying purchases made through our affiliate links.
              </p>
              <p>
                Flipkart and the Flipkart logo are registered trademarks of Flipkart Internet Private Limited.
              </p>
            </section>

            <section>
              <h2>Price Disclaimer</h2>
              <p>
                <strong>Prices may vary.</strong> All prices displayed on Cheapr are for informational 
                purposes only and may have changed since the last update. The actual price at the 
                time of purchase will govern the sale. We recommend checking the product page on 
                Amazon or Flipkart for the most up-to-date price.
              </p>
            </section>

            <section>
              <h2>Product Information</h2>
              <p>
                Product images, descriptions, and specifications are sourced from Amazon and Flipkart. 
                While we strive to provide accurate information, we cannot guarantee that all 
                information is complete, accurate, or current.
              </p>
            </section>

            <section>
              <h2>External Links</h2>
              <p>
                Our website contains links to external sites (Amazon and Flipkart). We are not 
                responsible for the content, accuracy, or availability of these external websites. 
                The inclusion of any link does not imply endorsement by Cheapr.
              </p>
            </section>

            <section>
              <h2>No Guarantee</h2>
              <p>
                Cheapr makes no representations or warranties of any kind, express or implied, 
                about the completeness, accuracy, reliability, suitability, or availability of 
                the information, products, services, or related graphics contained on this website.
              </p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>
                If you have any questions about this disclaimer, please contact us at:
                <br />
                <strong>Email:</strong> support@cheapr.com
              </p>
            </section>

            <div className="disclaimer-summary">
              <h3>In Summary</h3>
              <ul>
                <li>✅ We earn affiliate commissions from purchases</li>
                <li>✅ Amazon Associates Program participant</li>
                <li>✅ Flipkart Affiliate Program participant</li>
                <li>⚠️ Prices may vary – always check the final price on the store</li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Disclaimer;