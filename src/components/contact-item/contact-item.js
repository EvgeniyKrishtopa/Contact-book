import React, {useContext} from 'react';
import {ContextContactItem} from '../../context/context';
import PropTypes from 'prop-types';

import './contact-item.css';

const ContactItem = ({ name, tel, email, id, status, itemVisibility }) => {
  
  const {asyncDeleteContact,statusSwitch} = useContext(ContextContactItem);

  return (
  <li className={itemVisibility
    ? "visible"
    : "inVisible"
  }>
    <div className={
      status
      ? "contact-item"
      : "contact-item inactive"
    }>
      {status
      ? <p>Active contact</p>
      : <p>Inactive contact</p>
      }
    <div className="item-data">
      <span className="name">Name:</span>
        <span>{name}</span>
    </div>
    <div className="item-data">
      <span className="phone">Phone:</span>
        <span>{tel}</span>
    </div>
    <div className="item-data">
      <span className="email">Email:</span>
        <span>{email}</span>
    </div>
    <div className="buttons">
      <span onClick={() => statusSwitch(id)} className="far fa-check-circle"></span>
      <span onClick={() => asyncDeleteContact(id)} className="fas fa-times"></span>
    </div>
    </div>
  </li>
)};

ContactItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.bool,
  itemVisibility: PropTypes.bool,
  id: PropTypes.string,
}

ContactItem.defaultProps = {
  name: '',
  phone: '',
  email: '',
  status: true,
  itemVisibility: true,
  id: 0,
}

export default ContactItem;