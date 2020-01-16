import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ value, type, onChange, placeholder }) => {
  return(
    <input className="contact-input" value={value} type={type} placeholder={placeholder} onChange={onChange}/>
  )
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Input;