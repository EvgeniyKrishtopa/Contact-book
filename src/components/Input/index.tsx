import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  type: string;
  className: string;
  placeholder: string;
  error?: FieldError;
}

const Input = React.forwardRef<
  HTMLInputElement,
  IInputProps & Omit<UseFormRegisterReturn, 'ref'>
>(({ type, placeholder, className, error, ...registerProps }, ref) => {
  const classNameHandler = error ? `${className} error` : className;

  return (
    <>
      <input
        {...registerProps}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={classNameHandler}
      />
      {error && <span className="error-field-message">{error.message}</span>}
    </>
  );
});

Input.displayName = 'Input';

export default Input;
