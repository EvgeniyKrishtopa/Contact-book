import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../contact-item/contactItem';

const ContactList = ({ contacts }) => (
  <ul>
    {
      contacts.map(item => (
        <ContactItem
          key={item.id}
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