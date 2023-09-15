import logo from '../../../assets/images/logo.png';
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-header">
            <h2 className="logo">
              <img className="footer-logo" src={logo} alt="logo" />
            </h2>
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
