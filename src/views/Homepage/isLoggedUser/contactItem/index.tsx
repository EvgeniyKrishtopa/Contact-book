import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteContactFromBook,
  changeContactStatus,
} from 'store/actions/Contacts/actions';
import {
  MdAccountBox,
  MdContactMail,
  MdContactPhone,
  MdCheckBox,
  MdDelete,
} from 'react-icons/md';
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

  const deleteContactHandler = () => {
    dispatch(deleteContactFromBook(id, userId));
  };

  const changeStatusContactHandler = () => {
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
            <MdAccountBox size={30} />
            {contactName}
          </span>
          <a href={`mailto:${contactEmail}`} className={styles.contactEmail}>
            <MdContactMail size={30} />
            {contactEmail}
          </a>
          <a href={`tel:${contactPhone}`} className={styles.contactPhone}>
            <MdContactPhone size={30} />
            {contactPhone}
          </a>
        </div>
        <div className={styles.contactHandlers}>
          <button
            onClick={changeStatusContactHandler}
            className={`${activeStatus ? styles.active : styles.inActive}`}
          >
            <MdCheckBox size={30} />
          </button>
          <button onClick={deleteContactHandler}>
            <MdDelete size={30} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default React.memo(ContactItem);
