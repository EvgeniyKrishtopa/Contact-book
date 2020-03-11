import React, {useContext} from 'react';
import {ContextContactItem} from '../../context/contextContactItem';
import item from './contact-item.module.scss';
import PropTypes from 'prop-types';



const ContactItem = React.memo(({ name, tel, email, id, status, itemVisibility, userId }) => {
  const {asyncDeleteContact,statusSwitch} = useContext(ContextContactItem);

  return (
  <li className={itemVisibility
    ? item.visible
    : item.inVisible
  }>
    <div className={
      status
      ? item.contactItem
      : `${item.contactItem} ${item.inactive}`
    }>
      {status
      ? <p>Active contact</p>
      : <p>Inactive contact</p>
      }
    <div className={item.itemData}>
      <span>Name:</span>
      <span className={item.itemData__name}>{name}</span>
    </div>
    <div className={item.itemData}>
      <span>Phone:</span>
      <span>{tel}</span>
    </div>
    <div className={item.itemData}>
      <span>Email:</span>
      <span>{email}</span>
    </div>
    <div className={item.buttons}>
      <span onClick={() => statusSwitch(id)} className="far fa-check-circle"></span>
      <span onClick={() => asyncDeleteContact(id, userId)} className="fas fa-times"></span>
    </div>
    </div>
  </li>
)});

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