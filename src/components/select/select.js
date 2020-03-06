import React from 'react';
import Option from './option';
import PropTypes from 'prop-types';

const Select = ({ onChange, contactsData }) => {
  return(
    <select className="contact-input" onChange={onChange}>
      {
        contactsData.map(item => {
          return  <Option key={item.id} value={item.id}>{item.name}</Option>
        })
      }
  </select>
  )
}

Select.propTypes = {
  contactsData: PropTypes.array,
  onChange: PropTypes.func
}

export default Select;