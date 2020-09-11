import React from 'react';
import styles from './styles.module.scss';
import MaterialIcon from 'material-icons-react';
import ContactForm from '../../../../components/ContactForm';
import ContactItem from './contactItem';

const IsLogginedUserPage = () => {
  return (
    <div className={styles.contactsPage}>
      <div className="container">
        <h2 className="center">Hello, User!</h2>
        <div className={styles.formBlock}>
          <h3 className="center">Add New Contact</h3>
          <ContactForm />
        </div>
        <div className={styles.selectContactBlock}>
          <h3 className="center">Select contact by Email</h3>
          <div className={styles.selectHolder}>
            <select>
              <option value="0"></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <MaterialIcon icon="expand_more" size="30" />
          </div>
        </div>
        <div className={styles.contactStatusFilter}>
          <h3 className="center">Filter contacts by status:</h3>
          <ul className={styles.contactsToggler}>
            <li>
              <a href="/">Active</a>
            </li>
            &nbsp;|&nbsp;
            <li>
              <a href="/">ALL</a>
            </li>
          </ul>
        </div>
        <div className={styles.contactBlock}>
          <h3 className="center">Your contacts:</h3>
          <ul>
            <ContactItem styles={styles} />
            <ContactItem styles={styles} />
            <ContactItem styles={styles} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IsLogginedUserPage;
