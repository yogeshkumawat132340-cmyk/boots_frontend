import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"; 

function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />

      <div className="contact-hero-banner-container">
        <div className="contact-hero-banner-content">
          <h1 className="contact-page-main-title">CONTACT US</h1>
          <div className="contact-banner-divider"></div>
          <p className="contact-breadcrumb-links">
            <Link to="/">HOME</Link> <span>/</span> CONTACT
          </p>
        </div>
      </div>

      <main className="contact-main-content-area">
        <div className="contact-info-grid-row">
          
          <div className="contact-circle-card-item">
            <div className="contact-icon-circle-badge">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h2 className="contact-card-header-title">LOCATION</h2>
            <p className="contact-card-subtext-detail">London Eye, London, United Kingdom</p>
          </div>

          <div className="contact-circle-card-item">
            <div className="contact-icon-circle-badge">
              <i className="fa-solid fa-phone"></i>
            </div>
            <h2 className="contact-card-header-title">PHONE</h2>
            <p className="contact-card-subtext-detail">
              <a href="tel:+1657123456" className="contact-link-anchor">(657) 123-456</a>
            </p>
          </div>

          <div className="contact-circle-card-item">
            <div className="contact-icon-circle-badge">
              <i className="fa-solid fa-envelope"></i>
            </div>
            <h2 className="contact-card-header-title">MAIL</h2>
            <p className="contact-card-subtext-detail">
              <a href="mailto:contact@website.com" className="contact-link-anchor">contact@website.com</a>
            </p>
          </div>

        </div>

        <div className="contact-keep-in-touch-wave-section">
          <div className="keep-in-touch-content-inner">
            <div className="equestrian-horse-logo-holder">
              <img 
                src="https://boots.oceanwp.org/wp-content/uploads/2021/01/blogo.png" 
                alt="" 
                className="horse-silhouette-gfx"
              />
            </div>
            <h3 className="keep-in-touch-main-heading">KEEP IN TOUCH</h3>
            
            <p className="keep-in-touch-success-alert-message">
              Thanks for contacting us! We will be in touch with you shortly.
            </p>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export default Contact;