import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import RegisterCover from '../../../../assets/images/register-cover.png';
import { InputGroup } from '../../../shared/components';
import { ENDPOINT } from '../../../../config/endpoint';
import { ApiService } from '../../services/api.service';
import { Spinner } from '../../../shared/components';
import { RootState } from '../../../app.reducers';
import { formatDateToString } from '../../../shared/utils/formatDate';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  gender: 'male' | 'female' | 'other';
  dob: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const apiService = new ApiService();

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState();

  const isLogged = useSelector((state: RootState) => state.authReducer.isLogged);
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const { confirmPassword, ...other } = data;
    const userData = {
      ...other,
      dob: other.dob.split('-').reverse().join('/'),
      picture: 'null',
    };

    try {
      await apiService.post([ENDPOINT.auth.register], userData);
      setIsLoading(false);
      navigate('/auth/login');
    } catch (error: any) {
      setIsLoading(false);
      setResError(error.response.data.errors[0]);
    }
  };

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  useEffect(() => {
    if (isLogged && location.pathname === '/auth/register') {
      navigate('/');
    }
  }, [isLogged, location.pathname, navigate]);

  return (
    <div className="d-flex register-page">
      <div className="register-wrap">
        {isLoading && <Spinner />}
        <div className="row">
          <div className="col col-7">
            <div className="register-form-wrap">
              <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="register-title">Register</h2>
                <div className="row">
                  <div className="col col-6">
                    <InputGroup
                      label="First Name*"
                      id="first-name"
                      {...register('firstName', {
                        required: 'First name is required!',
                      })}
                      error={errors.firstName?.message}
                      onBlur={(e) => handleTrimInput('firstName', e.target.value)}
                    />
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Last Name*"
                      id="last-name"
                      {...register('lastName', {
                        required: 'Last name is required!',
                      })}
                      error={errors.lastName?.message}
                      onBlur={(e) => handleTrimInput('lastName', e.target.value)}
                    />
                  </div>
                  <div className="col col-12">
                    <InputGroup
                      label="Email*"
                      id="email"
                      type="text"
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
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Display Name*"
                      id="display-name"
                      {...register('displayName', {
                        required: 'Display name is required!',
                        minLength: {
                          value: 6,
                          message: 'Display name must be at least 6 characters!',
                        },
                      })}
                      error={errors.displayName?.message}
                      onBlur={(e) => handleTrimInput('displayName', e.target.value)}
                    />
                  </div>
                  <div className="col col-6">
                    <div className="form-check-wrap">
                      <p className="form-check-title">Gender*</p>
                      <ul className="form-check-list d-flex">
                        <li className="d-flex form-check-item">
                          <input
                            id="male"
                            type="radio"
                            value="male"
                            className="form-check-input"
                            defaultChecked
                            {...register('gender', { required: true })}
                          />
                          <label className="form-check-label" htmlFor="male">
                            Male
                          </label>
                        </li>
                        <li className="d-flex form-check-item">
                          <input
                            id="female"
                            type="radio"
                            value="female"
                            className="form-check-input"
                            {...register('gender', { required: true })}
                          />
                          <label className="form-check-label" htmlFor="female">
                            Female
                          </label>
                        </li>
                        <li className="d-flex form-check-item">
                          <input
                            id="other"
                            type="radio"
                            value="other"
                            className="form-check-input"
                            {...register('gender', { required: true })}
                          />
                          <label className="form-check-label" htmlFor="other">
                            Other
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Date of Birth*"
                      type="date"
                      max={formatDateToString(new Date())}
                      id="dob"
                      {...register('dob', {
                        required: 'Date of Birth is required!',
                      })}
                      error={errors.dob?.message}
                      onBlur={(e) => {
                        handleTrimInput('dob', e.target.value);
                      }}
                    />
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Phone*"
                      type="text"
                      id="phone"
                      {...register('phone', {
                        required: 'Phone is required!',
                        pattern: {
                          value: /^[0-9]\d*$/,
                          message: 'Phone must be number!',
                        },
                      })}
                      error={errors.phone?.message}
                      onBlur={(e) => handleTrimInput('phone', e.target.value)}
                    />
                  </div>
                  <div className="col col-6">
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
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Confirm Password*"
                      type="password"
                      id="confirm-password"
                      {...register('confirmPassword', {
                        required: 'Confirm Password is required!',
                        validate: (val: string) => {
                          if (watch('password') != val) {
                            return 'Your passwords do no match!';
                          }
                        },
                      })}
                      error={errors.confirmPassword?.message}
                      onBlur={(e) => handleTrimInput('confirmPassword', e.target.value)}
                    />
                  </div>
                  <div className="col col-12">
                    <div className="d-flex register-action">
                      <button className="btn btn-primary" type="submit">
                        {isLoading ? 'Loading...' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="register-redirect">
              <span className="register-redirect-message">Already have an account? </span>
              <Link className="register-redirect-link" to={'/auth/login'}>
                Login
              </Link>
            </div>
            <p
              className={`register-error ${
                resError ? 'visible' : 'invisible'
              } text-danger text-center`}
            >
              {resError}
            </p>
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
