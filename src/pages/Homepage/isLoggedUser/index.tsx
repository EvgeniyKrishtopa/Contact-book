import React from 'react';
import { useDispatch } from 'react-redux';
import { LogOut } from '../../../store/actions/Users/actions';
import { SendContact } from '../../../store/actions/Contacts/actions';
import styles from './styles.module.scss';
import ContactForm from '../../../components/ContactForm';
import ContactItem from './contactItem';
import SelectContact from './selectContact';
import StatusToggler from './statusToggler';
import { useHistory } from 'react-router-dom';

export interface IContactSendData {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}
const IsLogginedUserPage: React.FC<any> = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOut = () => {
    async function logOutHandler() {
      await dispatch(LogOut());
    }
    logOutHandler().then(() => history.push('/'));
  };

  const formSubmit = ({
    contactName,
    contactEmail,
    contactPhone,
  }: IContactSendData) => {
    dispatch(SendContact(contactName, contactEmail, contactPhone));
  };

  return (
    <div className={styles.contactsPage}>
      <div className="container">
        <h2 className="center">{user && `Hello, ${user.displayName}`}</h2>
        <div className={styles.formBlock}>
          <h3 className="center">Add New Contact</h3>
          <ContactForm onSubmit={formSubmit} />
        </div>
        <div className={styles.selectContactBlock}>
          <h3 className="center">Select contact by Email</h3>
          <SelectContact />
        </div>
        <div className={styles.contactStatusFilter}>
          <h3 className="center">Filter contacts by status:</h3>
          <StatusToggler />
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
