import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from '../contact-item/contactItem';

const ContactList = ({ contacts }) => (
  <ul>
    {
      contacts.map(item => (
          //TODO: запили деструктуризацию item прямо тут, так проще читать его внутренности
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
  contacts: PropTypes.array // TODO: PropTypes.shape({}) и описывай item - раз уже проптайпс - то хотя-бы так
}

ContactList.defaultProps = {
  contacts: []
}
//TODO: используй именованные экспорты 'export { ContactList }' - поможет избежать непредсказуемых проблем
export default ContactList;