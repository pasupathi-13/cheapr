import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message
    setSubmitted(true);
    // In production, send data to backend or email service
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us – Cheapr</title>
        <meta name="description" content="Get in touch with Cheapr. We'd love to hear from you." />
      </Helmet>
      <div className="contact-page">
        <Navbar showSearch={true} />
        
        <div className="contact-container container">
          <h1 className="contact-title">Contact Us</h1>
          
          <div className="contact-wrapper">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                Have questions, feedback, or suggestions? We'd love to hear from you. 
                Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <div>
                    <h4>Email</h4>
                    <p>support@cheapr.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">⏰</span>
                  <div>
                    <h4>Working Hours</h4>
                    <p>Mon–Fri, 10:00 AM – 6:00 PM IST</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <div>
                    <h4>Location</h4>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="contact-success">
                  <span className="success-icon">✅</span>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your message here..."
                    />
                  </div>
                  
                  <button type="submit" className="contact-submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contact;