import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoImage from '../../../assets/images/logo-img.png';

import { signOut } from '../../core/auth/auth.actions';
import { RootState } from '../../app.reducers';

export const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <header className="header position-sticky">
      <div className="container">
        <div className="header-inner">
          <div className="row">
            <div className="col col-4">
              <div className="header-logo">
                <Link to={'/'} className="logo-link">
                  <h1 className="logo">
                    <img
                      className="logo-image"
                      src={LogoImage}
                      alt="Lit.it Blog"
                    />
                  </h1>
                </Link>
              </div>
            </div>
            <div className="col col-4">
              <nav className="nav">
                <ul className="d-flex nav-list">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Write
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      About Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col col-4">
              <div className="header-action">
                <ul className="d-flex action-list">
                  {location.pathname !== '/auth/login' &&
                    location.pathname !== '/auth/register' &&
                    isLogged && (
                      <>
                        <li className="action-item">
                          <Link
                            to={'/users'}
                            className="action-link display-name"
                          >
                            {userInfo.displayName}
                          </Link>
                        </li>
                        <li className="action-item">
                          <Link
                            to={'auth/login'}
                            className="btn btn-outline action-link"
                            onClick={handleSignOut}
                          >
                            Logout
                          </Link>
                        </li>
                      </>
                    )}

                  {location.pathname === '/auth/login' && !isLogged && (
                    <li className="action-item">
                      <Link
                        to={'auth/register'}
                        className="btn btn-outline action-link"
                      >
                        Sign up
                      </Link>
                    </li>
                  )}

                  {(location.pathname === '/' && !isLogged) ||
                  location.pathname === '/auth/register' ? (
                    <li className="action-item">
                      <Link
                        to={'auth/login'}
                        className="btn btn-outline action-link"
                      >
                        Sign in
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
