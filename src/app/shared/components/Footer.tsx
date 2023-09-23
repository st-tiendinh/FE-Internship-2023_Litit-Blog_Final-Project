import { Link } from 'react-router-dom';
import LogoImage from '../../../assets/images/logo.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col col-6">
              <Link to={'/'} className="logo-link">
                <h1 className="logo">
                  <img
                    src={LogoImage}
                    alt="Lit.it Blog"
                    className="logo-image"
                  />
                </h1>
              </Link>
            </div>
            <div className="col col-6">
              <div className="row">
                <div className="col col-6">
                  <h4 className="footer-title">Tags</h4>
                  <ul className="footer-reference-list">
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        Java
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        React
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        BunJS
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        Express
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col col-6">
                  <h4 className="footer-title">Quick link</h4>
                  <ul className="footer-reference-list">
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        About Us
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        Contact Us
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="footer-reference-item">
                      <a href="" className="footer-reference-link">
                        Site Map
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sub-footer">
        <div className="container">
          <p className="copy-right">
            Copyright © 2023 All Rights Reserved by Litit
          </p>
          <ul className="footer-social-list">
            <li className="footer-social-item">
              <a href="" className="footer-social-link">
                <i className="icon icon-facebook"></i>
              </a>
            </li>
            <li className="footer-social-item">
              <a href="" className="footer-social-link">
                <i className="icon icon-twitter"></i>
              </a>
            </li>
            <li className="footer-social-item">
              <a href="" className="footer-social-link">
                <i className="icon icon-linkedin"></i>
              </a>
            </li>
            <li className="footer-social-item">
              <a href="" className="footer-social-link">
                <i className="icon icon-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
