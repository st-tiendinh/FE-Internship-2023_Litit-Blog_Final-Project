import React, { InputHTMLAttributes, useState, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, id, name, error, className, type, ...rest }, ref) => {
    const hasError = !!error;
    const [isShowPassword, setIsShowPassword] = useState(false);

    return (
      <div className={`input-field ${hasError ? 'error' : null}`}>
        <div className="input-wrap">
          <input
            ref={ref}
            id={id}
            name={name}
            type={
              type === 'password'
                ? isShowPassword
                  ? 'text'
                  : 'password'
                : type
            }
            placeholder={label}
            className={`input ${hasError ? 'error' : null} ${className}`}
            {...rest}
          />
          <label className={`label ${hasError ? 'error' : null}`} htmlFor={id}>
            {label}
          </label>
          {type === 'password' && (
            <i
              className={`input-icon icon ${
                isShowPassword ? 'icon-show' : 'icon-hide'
              }`}
              onClick={() => setIsShowPassword(!isShowPassword)}
            ></i>
          )}
        </div>
        <p className="error-message">{error}</p>
      </div>
    );
  }
);
