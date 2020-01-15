import React from 'react';
import PropTypes from 'prop-types';

import './contact-item.css';

const ContactItem = ({ name, tel, email, id, removeContact, statusSwitch, status, itemVisibility }) => (
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
      <span onClick={() => removeContact(id)} className="fas fa-times"></span>
    </div>
    </div>
  </li>
);

ContactItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  status: PropTypes.bool,
  itemVisibility: PropTypes.bool,
  removeContact: PropTypes.func,
  statusSwitch: PropTypes.func,
  id: PropTypes.string,
}

ContactItem.defaultProps = {
  name: '',
  phone: '',
  email: '',
  status: true,
  itemVisibility: true,
  removeContact: () => {},
  statusSwitch: () => {},
  id: 0,
}

export default ContactItem;