import React, { forwardRef, HTMLProps } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectGroupProps extends HTMLProps<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export const SelectGroup = forwardRef<HTMLSelectElement, SelectGroupProps>(
  ({ label, id, name, className, options, error, ...rest }, ref) => {
    const handleSelectChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      if (event.target.value) {
        event.target.classList.add('has-value');
      } else {
        event.target.classList.remove('has-value');
      }
    };

    return (
      <div className={`select-group ${error ? 'error' : ''}`}>
        <div className="form-floating">
          <select
            ref={ref}
            id={id}
            name={name}
            className={`form-select ${className} ${error ? 'error' : ''}`}
            {...rest}
            onChange={handleSelectChange}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label
            className={`form-select-label ${error ? 'error' : ''}`}
            htmlFor={id}
          >
            {label}
          </label>
        </div>
        <p className="select-group-error">{error}</p>
      </div>
    );
  }
);
