import RegisterCover from '../../../../assets/images/register-cover.png';
import { InputField } from '../../../shared/components/InputField';

const Register = () => {
  return (
    <div className="d-flex register-page">
      <div className="row register-wrap">
        <div className="col col-7 register-form-wrap">
          <form className="register-form">
            <h2 className="register-title">Register</h2>
            <div className="row">
              <div className="col col-6 ">
                <InputField label="First Name" />
              </div>
              <div className="col col-6 ">
                <InputField label="Last Name" id="last-name" />
              </div>
              <div className="col col-12">
                <InputField label="Email" id="email" />
              </div>
              <div className="col col-6">
                <InputField label="Display name" id="display-name" />
              </div>
              <div className="col col-6 gender-wrap">
                <p className="gender-label">Gender</p>
                <ul className="radio-list d-flex">
                  <li className="d-flex radio-item">
                    <input
                      id="male"
                      name="male"
                      type="radio"
                      className="radio-input"
                    />
                    <label className="radio-label" htmlFor="male">
                      Male
                    </label>
                  </li>
                  <li className="d-flex radio-item">
                    <input
                      id="female"
                      name="female"
                      type="radio"
                      className="radio-input"
                    />
                    <label className="radio-label" htmlFor="female">
                      Female
                    </label>
                  </li>
                </ul>
              </div>
              <div className="col col-6">
                <InputField label="Birthday" type="date" id="birthday" />
              </div>
              <div className="col col-6">
                <InputField label="Phone" type="number" id="phone" />
              </div>
              <div className="col col-6">
                <InputField label="Password" type="password" id="password" />
              </div>
              <div className="col col-6">
                <InputField
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                />
              </div>
              <div className="col col-12 d-flex register-action">
                <button className="btn btn-primary register-btn">
                  Register
                </button>
              </div>
            </div>
          </form>
          <div className="register-redirect">
            <span className="register-redirect-message">
              Already have an account?{' '}
            </span>
            <a className="register-redirect-link" href="#">
              Login
            </a>
          </div>
        </div>
        <div className="col col-5 register-cover">
          <img src={RegisterCover} alt="Register Cover" />
        </div>
      </div>
    </div>
  );
};

export default Register;
