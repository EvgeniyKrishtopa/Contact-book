import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { IContact } from '../../../../typings/interfaces';

const ContactItem: React.FC<IContact> = ({
  contactEmail,
  contactName,
  contactPhone,
  activeStatus,
  id,
}) => {
  return (
    <li className={`${styles.contactItem} ${styles.activeContact}`}>
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
          <button>
            <MaterialIcon icon="check" size="30" />
          </button>
          <button>
            <Link to="/edit/1">
              <MaterialIcon icon="edit" size="30" />
            </Link>
          </button>
          <button>
            <MaterialIcon icon="delete" size="30" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ContactItem;
