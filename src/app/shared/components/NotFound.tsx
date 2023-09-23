import { Link, useNavigate } from 'react-router-dom';
import image404 from '../../../assets/images/notfound404.gif';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-page-header">
        <span className="notfound-page-error">404</span>
        <h3 className="notfound-page-title">Page Not Found</h3>
      </div>
      <img className="notfound-page-image" src={image404} alt="page not found" />
      <div className="notfound-page-content">
        <p className="notfound-page-desc">
          We're sorry, This page is unknown or does not exist the page you are looking for.
        </p>
        <div className="notfound-page-action">
          <button className="btn btn-primary">
            <Link to={'/'}>Back To Home</Link>
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-outline">
            Previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
