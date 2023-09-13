import React, { InputHTMLAttributes, useState } from 'react';

interface InputGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  name,
  error,
  className,
  type,
  ...rest
}) => {
  const hasError = !!error;
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className={`input-group ${hasError ? 'error' : null}`}>
      <div className="form-floating">
        <input
          id={id}
          name={name}
          type={
            type === 'password' ? (isShowPassword ? 'text' : 'password') : type
          }
          placeholder={label}
          className={`form-control ${hasError ? 'error' : null} ${className}`}
          {...rest}
        />
        <label
          className={`form-control-label ${hasError ? 'error' : null}`}
          htmlFor={id}
        >
          {label}
        </label>
        {type === 'password' && (
          <i
            className={`form-control-icon icon ${
              isShowPassword ? 'icon-show' : 'icon-hide'
            }`}
            onClick={() => setIsShowPassword(!isShowPassword)}
          ></i>
        )}
      </div>
      <p className="input-group-error">{error}</p>
    </div>
  );
};
