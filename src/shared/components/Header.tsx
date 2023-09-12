import Logo from '../../assets/images/logo.png';

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner d-flex">
          <a href="" className="logo-link">
            <h1 className="logo">
              <img className="logo-image" src={Logo} alt="Tilth Blog" />
            </h1>
          </a>
          <nav className="nav">
            <ul className="nav-list d-flex">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Write
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-primary btn-login" href="#">
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
