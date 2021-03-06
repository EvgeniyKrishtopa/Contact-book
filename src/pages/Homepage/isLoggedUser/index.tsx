import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogOut } from 'store/actions/Users/actions';
import {
  SendContact,
  FetchCurrentUserContacts,
} from 'store/actions/Contacts/actions';
import styles from './styles.module.scss';
import ContactForm from 'components/ContactForm';
import ContactList from './contactsList';
import SelectContact from './selectContact';
import StatusToggler from './statusToggler';
import { useHistory } from 'react-router-dom';
import { getCurrentUserContacts } from 'selectors';
import { RootState } from 'store/reducers';
import { IContacts, IContact } from 'typings/interfaces';

export interface IContactSendData {
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const ContactsWidgets: React.FC<{ contactList: Array<IContact> }> = ({
  contactList,
}) => {
  return (
    <>
      {contactList.length > 1 && (
        <>
          <SelectContact contacts={contactList} />
          <StatusToggler contacts={contactList} />
        </>
      )}
      {contactList.length > 0 && <ContactList contacts={contactList} />}
    </>
  );
};

const IsLogginedUserPage: React.FC<any> = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userContacts = useSelector<RootState, IContacts>(state =>
    getCurrentUserContacts(state),
  );

  useEffect(() => {
    dispatch(FetchCurrentUserContacts(user.uid));
  }, [user, dispatch]);

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
    dispatch(SendContact(contactName, contactEmail, contactPhone, user.uid));
  };

  return (
    <div className={styles.contactsPage}>
      <div className="container">
        <h2 className="center">{user && `Hello, ${user.displayName}`}</h2>
        <div className={styles.formBlock}>
          <h3 className="center">Add New Contact</h3>
          <ContactForm onSubmit={formSubmit} />
        </div>
        {userContacts.contactsData ? (
          <ContactsWidgets contactList={userContacts.contactsData} />
        ) : (
          <p>Loading...</p>
        )}
        <div className={styles.btnHolder}>
          <button className="btn" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IsLogginedUserPage);
