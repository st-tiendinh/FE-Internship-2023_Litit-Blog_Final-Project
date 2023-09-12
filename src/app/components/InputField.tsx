import React, { InputHTMLAttributes } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  error,
  ...rest
}) => {
  const hasError = !!error;

  return (
    <div className={`input-field ${hasError ? 'error' : null}`}>
      <div className="input-wrap">
        <input
          id={name}
          name={name}
          placeholder={label}
          className={`input ${hasError ? 'error' : null}`}
          {...rest}
        />
        <label className={`label ${hasError ? 'error' : null}`} htmlFor={name}>
          {label}
        </label>
      </div>
      <p className="error-message">{error}</p>
    </div>
  );
};
