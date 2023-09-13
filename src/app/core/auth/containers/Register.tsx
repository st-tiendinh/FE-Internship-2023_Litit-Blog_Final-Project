import { useForm } from 'react-hook-form';

import RegisterCover from '../../../../assets/images/register-cover.png';
import { InputGroup } from '../../../shared/components';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  gender: 'male' | 'female';
  birthday: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  return (
    <div className="d-flex register-page">
      <div className="register-wrap">
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
                      onBlur={(e) =>
                        handleTrimInput('firstName', e.target.value)
                      }
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
                      onBlur={(e) =>
                        handleTrimInput('lastName', e.target.value)
                      }
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
                          value:
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
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
                          message:
                            'Display name must be at least 6 characters!',
                        },
                      })}
                      error={errors.displayName?.message}
                      onBlur={(e) =>
                        handleTrimInput('displayName', e.target.value)
                      }
                    />
                  </div>
                  <div className="col col-6">
                    <div className="form-check-wrap">
                      <p className="form-check-title">Gender</p>
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
                      </ul>
                    </div>
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Birthday*"
                      type="date"
                      id="birthday"
                      {...register('birthday', {
                        required: 'Birthday is required!',
                      })}
                      error={errors.birthday?.message}
                      onBlur={(e) =>
                        handleTrimInput('birthday', e.target.value)
                      }
                    />
                  </div>
                  <div className="col col-6">
                    <InputGroup
                      label="Phone*"
                      type="tel"
                      id="phone"
                      {...register('phone', {
                        required: 'Phone is required!',
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
                      })}
                      error={errors.password?.message}
                      onBlur={(e) =>
                        handleTrimInput('password', e.target.value)
                      }
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
                      onBlur={(e) =>
                        handleTrimInput('confirmPassword', e.target.value)
                      }
                    />
                  </div>
                  <div className="col col-12">
                    <div className="d-flex register-action">
                      <button className="btn btn-primary" type="submit">
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
