import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InputGroup } from '../../../shared/components/InputGroup';

import { signIn } from '../auth.actions';
import { RootState } from '../../../app.reducers';
import { Link, useNavigate } from 'react-router-dom';
import { setLS } from '../../helpers/storageHelper';
import JwtHelper from '../../helpers/jwtHelper';
import { ApiService } from '../../services/api.service';
import { ENDPOINT } from '../../../../config/endpoint';
import { KEYS } from '../../helpers/storageHelper';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const jwtHelper = useMemo(() => new JwtHelper(), []);
  const http = useMemo(() => new ApiService(), []);
  const isLoading = useSelector(
    (state: RootState) => state.authReducer.isLoading
  );
  const hasError = useSelector(
    (state: RootState) => state.authReducer.hasError
  );
  const error = useSelector((state: RootState) => state.authReducer.error);
  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const loginWithGoogleDomain = import.meta.env.VITE_WEBSITE_DOMAIN;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (isLogged) {
      http
        .get([ENDPOINT.users.index, jwtHelper.getUserInfo().userId.toString()])
        .then((res: any) => {
          const userData = {
            ...res,
            id: jwtHelper.getUserInfo().userId,
            isSocial: false,
          };
          setLS(KEYS.USER_INFO, userData);
        });
      navigate('/');
    }
  }, [isLogged, http, jwtHelper, navigate]);

  const onSubmit = (data: FormData) => {
    dispatch(signIn(data));
  };

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  return (
    <>
      <div className="signin-page">
        <div className="signin-wrapper">
          <div className="signin-form-wrapper">
            <p className="signin-title">Sign in</p>
            <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
              <InputGroup
                id="email"
                label="Email*"
                {...register('email', {
                  required: 'Email is required!',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: 'Email is not valid',
                  },
                })}
                error={errors.email?.message}
                onBlur={(e) => handleTrimInput('email', e.target.value)}
              />
              <InputGroup
                label="Password*"
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password is required!',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters!',
                  },
                })}
                error={errors.password?.message}
                onBlur={(e) => handleTrimInput('password', e.target.value)}
              />
              <button
                className={`btn btn-primary ${isLoading ? 'loading' : null}`}
                disabled={isLoading}
                type="submit"
              >
                <span className="btn-text">Sign in</span>
              </button>

              <Link
                to={`http://ec2-18-143-176-131.ap-southeast-1.compute.amazonaws.com:3000/api/v1/auth/google?redirect_to=${loginWithGoogleDomain}`}
                className="btn btn-sign-in-with-google"
              >
                <i className="icon icon-google"></i>
                <span className="sign-in-with-google-title">
                  Sign in with google
                </span>
              </Link>
            </form>
            <p className="signin-error text-center text-danger">
              {hasError && !isLoading && error?.response?.data?.errors}
            </p>
            <p className="signin-redirect">
              Don't have an account yet?{' '}
              <Link className="signin-redirect-link" to={'/auth/register'}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
