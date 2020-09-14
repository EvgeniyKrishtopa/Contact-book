import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../store/actions';
import styles from './styles.module.scss';
import MaterialIcon from 'material-icons-react';
import ContactForm from '../../../components/ContactForm';
import ContactItem from './contactItem';
import { Redirect } from 'react-router-dom';

const IsLogginedUserPage = ({ user }) => {
  const dispatch = useDispatch();
  const [isSignOut, setIsSignOut] = useState(false);
  const [isExistUser, setIsExistUser] = useState(true);

  useEffect(() => {
    if (!user.userData) {
      setIsExistUser(false);
    }
  }, [user, isSignOut]);

  const signOut = () => {
    dispatch(LogOut());

    setIsSignOut(true);
  };

  if (!isExistUser && isSignOut) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.contactsPage}>
      <div className="container">
        <h2 className="center">
          {user.userData && `Hello, ${user.userData.displayName}`}
        </h2>
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
              <a href="/">Inactive</a>
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
            <ContactItem />
          </ul>
        </div>
        <div className={styles.btnHolder}>
          <button className="btn" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsLogginedUserPage;
