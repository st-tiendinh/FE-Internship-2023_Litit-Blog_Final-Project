import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { InputGroup } from '../../../../shared/components';
import { RootState } from '../../../../app.reducers';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';
import { useNavigate } from 'react-router-dom';

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const UserChangePassword = ({ setFilter }: any) => {
  const apiService = new ApiService();
  const jwtHelper = new JwtHelper();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const hasError = useSelector((state: RootState) => state.authReducer.hasError);
  const error = useSelector((state: RootState) => state.authReducer.error);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  const handleChangePassword = async (data: any) => {
    try {
      apiService.setHeaders(jwtHelper.getAuthHeader());
      const res: any = await apiService.put([ENDPOINT.users.changePassword], data);
      if (res) {
        setFilter('public-post');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: FormData) => {
    const { oldPassword, newPassword } = data;
    handleChangePassword({ oldPassword, newPassword });
  };
  return (
    <>
      <div className="change-password-wrapper">
        <div className="change-password-form-wrapper">
          <p className="change-password-title">Set your new password</p>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <InputGroup
              label="Old Password*"
              type="password"
              id="oldPassword"
              {...register('oldPassword', {
                required: 'Old Password is required!',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters!',
                },
              })}
              error={errors.oldPassword?.message}
              onBlur={(e) => handleTrimInput('oldPassword', e.target.value)}
            />

            <InputGroup
              label="New Password*"
              type="password"
              id="newPassword"
              {...register('newPassword', {
                required: 'New Password is required!',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters!',
                },
              })}
              error={errors.newPassword?.message}
              onBlur={(e) => handleTrimInput('newPassword', e.target.value)}
            />

            <InputGroup
              label="Confirm Password*"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: 'Confirm Password is required!',
                validate: (val: string) => {
                  if (watch('newPassword') != val) {
                    return 'Your passwords do no match!';
                  }
                },
              })}
              error={errors.confirmPassword?.message}
              onBlur={(e) => handleTrimInput('confirmPassword', e.target.value)}
            />

            <button
              className={`btn btn-primary ${isLoading ? 'loading' : null}`}
              disabled={isLoading}
              type="submit"
            >
              <span className="btn-text">Change password</span>
            </button>
          </form>
          <p className="signin-error text-center text-danger">
            {hasError && !isLoading && error?.response?.data?.errors}
          </p>
        </div>
      </div>
    </>
  );
};
