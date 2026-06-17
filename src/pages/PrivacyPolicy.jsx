import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy – Cheapr</title>
        <meta name="description" content="Cheapr's privacy policy. Learn how we collect, use, and protect your data." />
      </Helmet>
      <div className="privacy-page">
        <Navbar showSearch={true} />
        
        <div className="privacy-container container">
          <h1 className="privacy-title">Privacy Policy</h1>
          
          <div className="privacy-content">
            <p className="privacy-updated">Last Updated: June 2026</p>

            <section>
              <h2>Introduction</h2>
              <p>
                At Cheapr, we value your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2>Information We Collect</h2>
              <h3>1. Personal Information</h3>
              <p>
                We collect personal information that you voluntarily provide to us when you:
              </p>
              <ul>
                <li>Contact us via email or our contact form (name, email address)</li>
                <li>Create an account (if applicable)</li>
                <li>Subscribe to our newsletter</li>
              </ul>

              <h3>2. Non-Personal Information</h3>
              <p>
                We automatically collect certain information when you visit our website, including:
              </p>
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit</li>
                <li>Time and date of your visit</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2>How We Use Your Information</h2>
              <ul>
                <li>To provide and maintain our service</li>
                <li>To improve user experience</li>
                <li>To respond to your inquiries</li>
                <li>To send promotional emails (only with your consent)</li>
                <li>To monitor usage patterns</li>
              </ul>
            </section>

            <section>
              <h2>Cookies</h2>
              <p>
                We use cookies to enhance your experience on our website. Cookies are small files 
                stored on your device that help us remember your preferences and analyze site usage.
              </p>
              <p>
                You can choose to disable cookies in your browser settings, but this may affect 
                the functionality of our website.
              </p>
            </section>

            <section>
              <h2>Third-Party Links</h2>
              <p>
                Our website contains links to third-party websites (Amazon and Flipkart). We are 
                not responsible for the privacy practices of these external sites. We encourage 
                you to review their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2>Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2>Children's Privacy</h2>
              <p>
                Our website is not intended for children under the age of 13. We do not knowingly 
                collect personal information from children.
              </p>
            </section>

            <section>
              <h2>Changes to This Policy</h2>
              <p>
                We reserve the right to update this Privacy Policy at any time. We will notify 
                you of any changes by posting the new policy on this page.
              </p>
            </section>

            <section>
              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                <br />
                <strong>Email:</strong> support@cheapr.com
              </p>
            </section>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;