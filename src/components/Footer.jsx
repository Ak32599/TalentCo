import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>TalentCo</h4>
          <p>&copy; 2025. All rights reserved.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="mailto:2400030159@kluniversity.in">Xemail</a>
            <a href="https://www.linkedin.com/in/akhilesh-rachapudi-43173a357/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B9rO8IM16Ss6E0VDpqPhbZw%3D%3D">LinkedIn</a>
            <a href="https://www.instagram.com/ravi_gunisetti/">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;