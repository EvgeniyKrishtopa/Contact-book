import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../contact-item/contact-item';

import './contact-list.css';

const ContactList = ({ contacts, removeContact, statusSwitch }) => (

  <ul className="contact-list">
    {
      contacts.map((item, index) => (
        <ContactItem
          key={index}
          name={item.name}
          id={item.id}
          tel={item.tel}
          removeContact={removeContact}
          statusSwitch={statusSwitch}
          email={item.email}
          status={item.status}
          itemVisibility={item.itemVisibility}
        />
      ))
    }
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
  removeContact: PropTypes.func,
  statusSwitch: PropTypes.func
}

ContactList.defaultProps = {
  contacts: [],
  removeContact: () => {},
  statusSwitch: () => {}
}

export default ContactList;