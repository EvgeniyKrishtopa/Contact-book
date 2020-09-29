import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteContactFromBook,
  changeContactStatus,
} from 'store/actions/Contacts/actions';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';
import { IContact } from 'typings/interfaces';
import { CurrentUserContext } from 'context';

const ContactItem: React.FC<IContact> = ({
  contactEmail,
  contactName,
  contactPhone,
  activeStatus,
  id,
  visibility,
}) => {
  const { userData } = useContext(CurrentUserContext);
  const userId: string = userData.uid;
  const dispatch = useDispatch();

  const deleteContactHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteContactFromBook(id, userId));
  };

  const changeStatusContactHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    dispatch(changeContactStatus(id, userId, activeStatus));
  };

  return (
    <li
      className={`${styles.contactItem} 
      ${activeStatus ? styles.activeContact : styles.inActiveContact}
      ${visibility ? styles.visibleContact : styles.hiddenContact}
      `}
    >
      <div className={styles.contactItemHolder}>
        <div className={styles.contactData}>
          <span className={styles.contactName}>
            <MaterialIcon icon="account_box" size="30" />
            {contactName}
          </span>
          <a href={`mailto:${contactEmail}`} className={styles.contactEmail}>
            <MaterialIcon icon="contact_mail" size="30" />
            {contactEmail}
          </a>
          <a href={`tel:${contactPhone}`} className={styles.contactPhone}>
            <MaterialIcon icon="contact_phone" size="30" />
            {contactPhone}
          </a>
        </div>
        <div className={styles.contactHandlers}>
          <button
            onClick={changeStatusContactHandler}
            className={`${activeStatus ? styles.active : styles.inActive}`}
          >
            <MaterialIcon icon="check_box" size="30" />
          </button>
          <button onClick={deleteContactHandler}>
            <MaterialIcon icon="delete" size="30" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
