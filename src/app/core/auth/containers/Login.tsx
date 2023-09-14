import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';

import signinImg from '../../../../assets/images/signin-img.jpg';
import { InputGroup } from '../../../shared/components/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../auth.actions';
import { RootState } from '../../../app.reducers';
import { Spinner } from '../../../shared/components';
import { useNavigate } from 'react-router-dom';
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
  const isLoading = useSelector((state: RootState) => state.authReducer.isLoading);
  const hasError = useSelector((state: RootState) => state.authReducer.hasError);
  const error = useSelector((state: RootState) => state.authReducer.error);
  const data = useSelector((state: RootState) => state.authReducer.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    if (data) {
      http
        .get([ENDPOINT.users.index, jwtHelper.getUserInfo().userId.toString()])
        .then((res: any) => {
          setLS(KEYS.USER_INFO, res);
        });
      navigate('/');
    }
  }, [data, http, jwtHelper, navigate]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(signIn(data));
  };

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
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
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                  {isLoading && <Spinner />}
                </form>
                <span className="signin-redirect">
                  <a href="register" className="signin-redirect-link">
                    Create an account
                  </a>
                </span>
                <p className="signin-error text-center text-danger">
                  {hasError && !isLoading && error?.response?.data?.errors}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
