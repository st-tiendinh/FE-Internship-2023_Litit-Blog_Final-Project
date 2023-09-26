import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { InputGroup } from '../../../../shared/components';
import { ApiService } from '../../../../core/services/api.service';
import JwtHelper from '../../../../core/helpers/jwtHelper';
import { ENDPOINT } from '../../../../../config/endpoint';

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordManagement = () => {
  const apiService = new ApiService();
  const jwtHelper = new JwtHelper();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrors] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const handleTrimInput = (fieldName: keyof FormData, value: string) => {
    setValue(fieldName, value.trim());
  };

  const handleChangePassword = async (data: any) => {
    setIsLoading(true);
    try {
      apiService.setHeaders(jwtHelper.getAuthHeader());
      const res: any = await apiService.put(
        [ENDPOINT.users.changePassword],
        data
      );
      setIsLoading(false);
    } catch (error: any) {
      setErrors(error.response.data.errors);
      setIsLoading(false);
    }
  };

  const onSubmit = (data: FormData) => {
    const { oldPassword, newPassword } = data;
    handleChangePassword({ oldPassword, newPassword });
  };

  return (
    <div className="change-password-wrapper">
      <h4 className="change-password-title">Change password</h4>
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
          onChange={(e) => {
            const newPasswordValue = e.target.value;
            const confirmPasswordValue = watch('confirmPassword');

            setValue('newPassword', newPasswordValue);
            trigger('newPassword');

            if (
              confirmPasswordValue &&
              newPasswordValue !== confirmPasswordValue
            ) {
              setError('confirmPassword', {
                type: 'manual',
                message: 'Password and confirm password must match!',
              });
            } else {
              setError('confirmPassword', {
                type: 'manual',
                message: undefined,
              });
            }
          }}
        />

        <InputGroup
          label="Confirm Password*"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: 'Confirm Password is required!',
            validate: (val: string) => {
              if (watch('newPassword') != val) {
                return 'Password and confirm password must match!';
              }
            },
          })}
          error={errors.confirmPassword?.message}
          onBlur={(e) => handleTrimInput('confirmPassword', e.target.value)}
        />

        <div className="d-flex button-wrapper">
          <button
            className={`btn btn-primary ${isLoading ? 'loading' : null}`}
            disabled={isLoading}
            type="submit"
          >
            <span className="btn-text">Change password</span>
          </button>
        </div>
      </form>
      <p className="signin-error text-center text-danger">
        {error && !isLoading && error}
      </p>
    </div>
  );
};
