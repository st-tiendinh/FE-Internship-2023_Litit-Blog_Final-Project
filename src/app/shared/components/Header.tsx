import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../../assets/images/logo.png';
import { signOut } from '../../core/auth/auth.actions';
import { RootState } from '../../app.reducers';

export const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const userInfo = useSelector((state: RootState) => state.authReducer.userInfo);

  const handleSignout = () => {
    dispatch(signOut());
  };

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
              {location.pathname !== '/auth/login' &&
                location.pathname !== '/auth/register' &&
                isLogged && (
                  <>
                    <li className="nav-item">
                      <Link to={'/users'} className="nav-link">
                        {userInfo.displayName}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={'auth/login'}
                        className="nav-link btn btn-primary btn-login"
                        onClick={handleSignout}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                )}

              {location.pathname === '/auth/login' && !isLogged && (
                <li className="nav-item">
                  <Link to={'auth/register'} className="nav-link btn btn-primary btn-login">
                    Register
                  </Link>
                </li>
              )}

              {(location.pathname === '/' && !isLogged) ||
              location.pathname === '/auth/register' ? (
                <li className="nav-item">
                  <Link to={'auth/login'} className="nav-link btn btn-primary btn-login">
                    Login
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
