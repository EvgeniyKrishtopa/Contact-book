import React from 'react';
import './option.scss';

const Option = ({ value, children}) => {
  return(
    <option value={value}>{children}</option>
  )
}

export default Option;