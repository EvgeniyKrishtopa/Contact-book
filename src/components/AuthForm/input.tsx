import React from 'react';
const Input: React.FC = ({
  input,
  type,
  placeholder,
  className,
  meta: { touched, error, warning },
}) => {
  const classNameHandler =
    (touched && error) || warning ? `${className} error` : className;
  return (
    <>
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        className={classNameHandler}
      />
      {touched &&
        ((error && <span className="error-field-message">{error}</span>) ||
          (warning && (
            <span className="warning-error-message">{warning}</span>
          )))}
    </>
  );
};

export default Input;
