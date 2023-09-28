import { Link } from 'react-router-dom';
import notFoundImg from '../../../assets/images/not-found.png';

const NotFoundElement = ({page}:any) => {
  return (
    <div className="notfound-page">
      <img className="notfound-page-image" src={notFoundImg} alt="page not found" />
      <div className="notfound-page-content">
        <p className="notfound-page-desc">
         {` We're sorry, ${page} is not found or you don't have permission to access.`}
        </p>
        <div className="notfound-page-action">
          <button className="btn btn-primary">
            <Link to={'/'}>Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundElement