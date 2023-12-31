import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { InputGroup } from '../../../shared/components';

import { ENDPOINT } from '../../../../config/endpoint';
import { ApiService } from '../../services/api.service';
import { RootState } from '../../../app.reducers';
import { formatDateToString } from '../../../shared/utils/formatDate';
import { GenderType } from '../../../pages/management/containers/components/UserProfile';
import { Dropdown } from '../../../shared/components/Dropdown';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
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
    watch,
    setError,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const [isLoading, setIsLoading] = useState(false);
  const [resError, setResError] = useState();
  const [gender, setGender] = useState(GenderType.MALE);

  const isLogged = useSelector(
    (state: RootState) => state.authReducer.isLogged
  );
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const { confirmPassword, ...other } = data;
    const userData = {
      ...other,
      dob: other.dob.split('-').join('/'),
      gender: gender,
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
    <div className="d-flex signup-page">
      <div className="signup-wrap">
        <h2 className="signup-title">Sign up</h2>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col col-6 col-sm-12">
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
            <div className="col col-6 col-sm-12">
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
            <div className="col col-12 col-sm-12">
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
            <div className="col col-6 col-sm-12">
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
            <div className="col col-6 col-sm-12">
              <Dropdown
                label="Gender"
                options={Object.values(GenderType)}
                option={gender}
                setOption={setGender}
              />
            </div>
            <div className="col col-6 col-sm-12">
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
            <div className="col col-6 col-sm-12">
              <InputGroup
                label="Phone*"
                type="text"
                id="phone"
                {...register('phone', {
                  required: 'Phone is required!',
                  pattern: {
                    value: /^(?:\+|[0-9])[0-9]{9,10}$/,
                    message: 'Phone number must be between 10 and 11 digits.',
                  },
                })}
                error={errors.phone?.message}
                onBlur={(e) => handleTrimInput('phone', e.target.value)}
              />
            </div>
            <div className="col col-6 col-sm-12">
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
                onChange={(e) => {
                  const passwordValue = e.target.value;
                  const confirmPasswordValue = watch('confirmPassword');
                  setValue('password', passwordValue);
                  trigger('password');
                  if (
                    confirmPasswordValue &&
                    e.target.value !== confirmPasswordValue
                  ) {
                    setError('confirmPassword', {
                      type: 'custom',
                      message: 'Password and confirm password must match!',
                    });
                  } else {
                    setError('confirmPassword', {
                      type: 'custom',
                      message: undefined,
                    });
                  }
                }}
              />
            </div>
            <div className="col col-6 col-sm-12">
              <InputGroup
                label="Confirm Password*"
                type="password"
                id="confirm-password"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required!',
                  validate: (val) => {
                    if (val !== watch('password')) {
                      return 'Password and confirm password must match!';
                    }
                  },
                })}
                error={errors.confirmPassword?.message}
                onBlur={(e) =>
                  handleTrimInput('confirmPassword', e.target.value)
                }
              />
            </div>
            <div className="col col-12 col-sm-12">
              <div className="d-flex signup-action">
                <button
                  className={`btn btn-primary ${isLoading ? 'loading' : null}`}
                  disabled={isLoading}
                  type="submit"
                >
                  <span className="btn-text">Sign up</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <p className={`signup-error text-danger text-center`}>
          {!!resError && !isLoading && resError}
        </p>
        <p className="signup-redirect">
          Already have an account?{' '}
          <Link className="signup-redirect-link" to={'/auth/login'}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
