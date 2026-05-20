import React from 'react'
import '../styles/footer.css'
import logoImage from '../../images/logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-brand-header">
            <div className="footer-logo-box">
              <img src={logoImage} alt="إيوان IWAN Restaurant Logo" />
            </div>
            <div>
              <h3 className="footer-brand-name">إيوان</h3>
              <p className="footer-brand-subtitle">IWAN</p>
            </div>
          </div>
          <p className="footer-tagline">
            مطعم إيوان — لافته الطعام العربي في كل حي، وجه تراثي بطعم عصري يجمع الثقافة والأصالة
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">روابط سريعة</h4>
          <div className="footer-links">
            <a href="#menu">المنيو</a>
            <a href="#contact">احجز طاولة</a>
            <a href="#contact-info">تواصل معنا</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-section-title">تواصل معنا</h4>
          <div className="footer-contact-items">
            <a href="tel:00970593386060" className="footer-contact-item">00970593386060</a>
            <a href="mailto:info@restaurant.iwan" className="footer-contact-item">info@restaurant.iwan</a>
            <span className="footer-contact-item">restaurant.iwan</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 إيوان | IWAN جميع الحقوق محفوظة
        </p>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/restaurant.iwan"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title="Facebook"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-6.9c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zM14 12.5c0 .3-.2.5-.5.5h-1v3h-1.5v-3h-1v-1.5h1v-.8c0-1 .3-2.5 2.5-2.5h1.5v1.4h-1c-.2 0-.2.1-.2.2v.7h1.5l-.3 1.5z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/share/1AsCVdgePp/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title="Instagram"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 11.5h-2v2h2v2h-2v2h-2v-2h-2v-2h2v-2h2v-2h2v2z"/>
            </svg>
          </a>
          <a
            href="https://wa.me/970593386060"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            title="WhatsApp"
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
