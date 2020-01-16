import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return(
    <button {...props}>{props.children}</button>
  )
}

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.string
}

export default Button