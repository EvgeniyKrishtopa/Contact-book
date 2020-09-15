import React from 'react';
const Input = props => {
  const setType = props.setLogin || props.setEmail || props.setPassword;

  return (
    <input
      {...props.input}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      className={props.className}
      onChange={e => setType(e.target.value)}
    />
  );
};

export default Input;
