import { Link } from 'react-router-dom';
import image404 from '../../../assets/images/notfound404.gif';

interface NotFoundProps {
  typeError?: string;
  message?: string;
}

const NotFound = ({ message, typeError }: NotFoundProps) => {
  return (
    <div className="notfound-page">
      <div className="notfound-page-header">
        <span className="notfound-page-error">404</span>
        <h3 className="notfound-page-title">{typeError} Not Found</h3>
      </div>
      <img
        className="notfound-page-image"
        src={image404}
        alt="page not found"
      />
      <div className="notfound-page-content">
        <p className="notfound-page-desc">
          {message
            ? message
            : "We're sorry, This page is unknown or does not exist the page you are looking for."}
        </p>
        <div className="notfound-page-action">
          <button className="btn btn-primary">
            <Link to={'/'}>Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
