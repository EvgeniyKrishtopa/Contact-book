import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../contact-item/contact-item';

import './contact-list.css';

const ContactList = ({ contacts }) => (

  <ul className="contact-list">
    {
      contacts.map((item, index) => (
        <ContactItem
          key={index}
          name={item.name}
          id={item.id}
          tel={item.tel}
          email={item.email}
          status={item.status}
          itemVisibility={item.itemVisibility}
          userId={item.userId}
        />
      ))
    }
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array
}

ContactList.defaultProps = {
  contacts: []
}

export default ContactList;