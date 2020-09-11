import React from 'react';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';

const ContactItem = ({ styles }) => {
  return (
    <li className={`${styles.contactItem} ${styles.activeContact}`}>
      <div className={styles.contactItemHolder}>
        <div className={styles.contactData}>
          <span className={styles.contactName}>
            <MaterialIcon icon="account_box" size="30" />
            Contact Name
          </span>
          <a href="mailto:email@gmail.com" className={styles.contactEmail}>
            <MaterialIcon icon="contact_mail" size="30" />
            email@gmail.com
          </a>
          <a href="tel:0934817799" className={styles.contactPhone}>
            <MaterialIcon icon="contact_phone" size="30" />
            0934817799
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
