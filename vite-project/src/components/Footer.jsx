import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-column brand-info">
          <div className="footer-logo">
            <span className="logo-icon">🥾</span>
            <h2>BOOTS</h2>
          </div>
          <p className="brand-text">
            Pellentesque id rhoncus augue nec maximus enim nunc commodo purus sit
          </p>
          <ul className="contact-details">
            <li><FaMapMarkerAlt className="icon" /> London Eye, London, United Kingdom</li>
            <li><FaPhoneAlt className="icon" /> (657) 123-456</li>
            <li><FaEnvelope className="icon" /> contact@website.com</li>
            <li><FaClock className="icon" /> Mon - Fri / 9:00 AM - 6:00 PM</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="column-title">INFORMATION</h3>
          <ul className="footer-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#location">Store Location</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#shipping">Shipping & Delivery</a></li>
            <li><a href="#news">Latest News</a></li>
            <li><a href="#sitemap">Our Sitemap</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="column-title">OUR SERVICE</h3>
          <ul className="footer-links">
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Sale</a></li>
            <li><a href="#customer">Customer Service</a></li>
            <li><a href="#delivery">Delivery Information</a></li>
            <li><a href="#payments">Payments</a></li>
            <li><a href="#cards">Saved Cards</a></li>
          </ul>
        </div>

        <div className="footer-column newsletter-col">
          <h3 className="column-title">NEWSLETTER</h3>
          <p className="newsletter-text">
            Subscribe to our mailing list to get the new updates!
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
              required 
            />
            <button type="submit" className="newsletter-btn">GO</button>
          </form>
          <label className="gdpr-checkbox">
            <input type="checkbox" required />
            <span>Accept GDPR Terms</span>
          </label>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© COPYRIGHT – OCEANWP</p>
      </div>
    </footer>
  );
}

export default Footer;