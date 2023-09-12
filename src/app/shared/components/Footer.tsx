import React from 'react';
import logo from '../../../assets/images/logo.png';
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer-header">
            <h1 className="logo">
              <img className="footer-logo" src={logo} alt="logo" />
            </h1>
            <p className="copyright">
              © JS Template 2023. All Rights Reserved.
            </p>
          </div>

          <div className="footer-content">
            <ul className="footer-info-list">
              <li className="footer-info-item">Terms of Use</li>
              <li className="footer-info-item">Privacy Policy</li>
              <li className="footer-info-item">Cookie Us</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
