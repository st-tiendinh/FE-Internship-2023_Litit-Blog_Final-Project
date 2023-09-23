import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LogoImage from '../../../assets/images/logo.png';
import BlankUserImg from '../../../assets/images/blank-user.webp';

import { signOut } from '../../core/auth/auth.actions';
import { RootState } from '../../app.reducers';
import JwtHelper from '../../core/helpers/jwtHelper';
import { useEffect, useRef, useState } from 'react';
import { isImageUrlValid } from '../utils/checkValidImage';

const jwtHelper = new JwtHelper();

export const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isValidUserImg, setIsValidUserImg] = useState(false);
  const userActionRef = useRef<HTMLDivElement | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [filter, setFilter] = useState<string | undefined>('');

  useEffect(() => {
    setFilter(location.pathname.split('/').pop());
  }, [location]);

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const userInfo = useSelector(
    (state: RootState) => state.authReducer.userInfo
  );

  useEffect(() => {
    isImageUrlValid(userInfo?.picture).then((isValid) => {
      isValid ? setIsValidUserImg(true) : setIsValidUserImg(false);
    });
  }, [isImageUrlValid, userInfo?.picture]);

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());

    navigate('/');
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        userActionRef.current &&
        event.target instanceof Node &&
        !userActionRef.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [setIsOpenDropdown]);

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
                    <Link
                      to={'/'}
                      className={`nav-link ${filter === '' ? 'active' : null}`}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={'articles'}
                      className={`nav-link ${
                        filter === 'articles' ? 'active' : null
                      }`}
                    >
                      Articles
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={'/articles/new'}
                      className={`nav-link ${
                        filter === 'new' ? 'active' : null
                      }`}
                    >
                      Write
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col col-4">
              <div className="d-flex header-action">
                <ul className="d-flex action-list">
                  {isLogged && (
                    <li className="action-item">
                      <div
                        onClick={() => setIsOpenDropdown(!isOpenDropdown)}
                        ref={userActionRef}
                        className="user-action"
                      >
                        <p className="user-name">{userInfo.displayName}</p>
                      </div>
                      {isOpenDropdown && (
                        <div className="dropdown-menu">
                          <ul className="menu-list">
                            <li className="menu-item">
                              <Link
                                className="d-flex menu-action"
                                to={`users/${jwtHelper.getUserInfo().userId}`}
                              >
                                <div className="user-avatar-wrapper">
                                  <img
                                    className="user-avatar"
                                    src={
                                      isValidUserImg
                                        ? userInfo.picture
                                        : BlankUserImg
                                    }
                                    alt="User Image"
                                  />
                                </div>
                                <div className="user-info">
                                  <p className="user-name">
                                    {userInfo.displayName}
                                  </p>
                                  <p className="user-email">{userInfo.email}</p>
                                </div>
                              </Link>
                            </li>
                            <Link to={'/management'} className="menu-item">
                              <div className="menu-action">Management</div>
                            </Link>
                            <li className="menu-item">
                              <div
                                onClick={handleSignOut}
                                className="menu-action action-logout"
                              >
                                <p className="logout-label">Sign out</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  )}

                  {location.pathname === '/auth/login' && !isLogged && (
                    <li className="action-item">
                      <Link
                        to={'auth/register'}
                        className="btn btn-secondary action-link"
                      >
                        Sign up
                      </Link>
                    </li>
                  )}

                  {!isLogged && location.pathname !== '/auth/login' && (
                    <li className="action-item">
                      <Link
                        to={'auth/login'}
                        className="btn btn-secondary action-link"
                      >
                        Sign in
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
