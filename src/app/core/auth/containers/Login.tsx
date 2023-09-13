import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import signinImg from '../../../../assets/images/signin-img.jpg';
import { InputGroup } from '../../../shared/components/InputGroup';
import { useDispatch } from 'react-redux';
import { signIn } from '../auth.actions';

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

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
