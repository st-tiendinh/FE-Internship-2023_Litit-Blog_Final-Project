import { Link } from 'react-router-dom';
import { InputField } from '../../../shared/components/InputField';
import signinImg from '../../../../assets/images/signin-img.jpg';

const Login = () => {
  return (
    <>
      <div className="signin-page">
        <div className="signin-wrapper">
          <div className="row">
            <div className="col col-6">
              <div className="signin-image-wrapper">
                <img
                  className="signin-image"
                  src={signinImg}
                  alt="Sign in image"
                />
              </div>
              
            </div>
            <div className="col col-6">
              <div className="signin-form-wrapper">
                <p className="signin-title">Sign in</p>
                <form action="">
                  <div className="form-group">
                    <InputField label="Email" />
                    <InputField label="Password" />
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </form>
                <span className="signin-redirect">
                <Link to={'auth/register'}>Create an account</Link>
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
