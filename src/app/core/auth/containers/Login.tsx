import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../auth.actions';
import { RootState } from '../../../app.reducers';
import JwtHelper from '../../helpers/jwtHelper';
import { ApiService } from '../../services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { Link } from 'react-router-dom';

import signinImg from '../../../../assets/images/signin-img.jpg';
import { InputGroup } from '../../../shared/components/InputGroup';

const Login = () => {
  const jwtHelper = useMemo(() => new JwtHelper(), []);
  const http = useMemo(() => new ApiService(), []);
  const dispatch = useDispatch();

  const data = useSelector((state: RootState) => state.authReducer.data);
  useEffect(() => {
    if (data) {
      http
        .get([ENDPOINT.users.index, jwtHelper.getUserInfo().userId.toString()])
        .then((res) => console.log(res));
    }
  }, [data, http, jwtHelper]);

  const onLogin = () => {
    const account = { email: 'quan.do@supremetech.vn', password: 'abc@12345' };
    dispatch(signIn(account));
  };

  return (
    <>
      <div className="signin-page">
        <div className="signin-wrapper">
          <div className="row">
            <div className="col col-6">
              <div className="signin-image-wrapper">
                <img className="signin-image" src={signinImg} alt="Sign in image" />
              </div>
            </div>
            <div className="col col-6">
              <div className="signin-form-wrapper">
                <p className="signin-title">Sign in</p>
                <form className="form-group">
                  <InputGroup label="Email" />
                  <InputGroup label="Password" />
                  <button className="btn btn-primary" type="submit" onClick={onLogin}>
                    Login
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
