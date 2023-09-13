import RegisterCover from '../../../../assets/images/register-cover.png';
import { InputGroup } from '../../../shared/components/InputGroup';

const Register = () => {
  return (
    <div className="d-flex register-page">
      <div className="register-wrap">
        <div className="row">
          <div className="col col-7">
            <div className="register-form-wrap">
              <form className="register-form">
                <h2 className="register-title">Register</h2>
                <div className="row">
                  <div className="col col-6">
                    <InputGroup label="First Name" id="first-name" />
                  </div>
                  <div className="col col-6">
                    <InputGroup label="Last Name" id="last-name" />
                  </div>
                  <div className="col col-12">
                    <InputGroup label="Email" id="email" />
                  </div>
                  <div className="col col-6">
                    <InputGroup label="Display name" id="display-name" />
                  </div>
                  <div className="col col-6">
                    <div className="form-check-wrap">
                      <p className="form-check-title">Gender</p>
                      <ul className="form-check-list d-flex">
                        <li className="d-flex form-check-item">
                          <input
                            id="male"
                            type="radio"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </li>
                        <li className="d-flex form-check-item">
                          <input
                            id="female"
                            type="radio"
                            className="form-check-input"
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col-6">
                    <InputGroup label="Birthday" type="date" id="birthday" />
                  </div>
                  <div className="col col-6">
                    <InputGroup label="Phone" type="number" id="phone" />
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Password"
                      type="password"
                      id="password"
                    />
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Confirm Password"
                      type="password"
                      id="confirm-password"
                    />
                  </div>
                  <div className="col col-12">
                    <div className="d-flex register-action">
                      <button className="btn btn-primary register-btn">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="register-redirect">
              <span className="register-redirect-message">
                Already have an account?{' '}
              </span>
              <a className="register-redirect-link" href="#">
                Login
              </a>
            </div>
          </div>
          <div className="col col-5">
            <div className="d-flex register-cover-wrap">
              <div className="register-cover">
                <img src={RegisterCover} alt="Register Cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
