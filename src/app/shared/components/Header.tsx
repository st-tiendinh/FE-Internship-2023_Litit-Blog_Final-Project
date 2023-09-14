import Logo from '../../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner d-flex">
          <Link to={'/'} className="logo-link">
            <h1 className="logo">
              <img className="logo-image" src={Logo} alt="Tilth Blog" />
            </h1>
          </Link>
          <nav className="nav">
            <ul className="nav-list d-flex">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Write
                </a>
              </li>
              <li className="nav-item">
                <Link to={'auth/register'} className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'auth/login'} className="nav-link btn btn-primary btn-login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
