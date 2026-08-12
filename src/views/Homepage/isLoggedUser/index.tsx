import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { LogOut } from 'store/actions/Users/actions';
import {
  SendContact,
  FetchCurrentUserContacts,
} from 'store/actions/Contacts/actions';
import ContactForm from 'components/ContactForm';
import ContactList from './contactsList';
import SelectContact from './selectContact';
import StatusToggler from './statusToggler';
import { useRouter } from 'next/navigation';
import { getCurrentUserContacts } from 'selectors';
import { IContact } from 'typings/interfaces';

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
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userContacts = useAppSelector(getCurrentUserContacts);

  useEffect(() => {
    dispatch(FetchCurrentUserContacts(user.uid));
  }, [user, dispatch]);

  const signOut = () => {
    async function logOutHandler() {
      await dispatch(LogOut());
    }
    logOutHandler().then(() => router.push('/'));
  };

  const formSubmit = ({
    contactName,
    contactEmail,
    contactPhone,
  }: IContactSendData) => {
    dispatch(
      SendContact({ contactName, contactEmail, contactPhone, userId: user.uid }),
    );
  };

  return (
    <div className="py-[40px] min-h-[calc(100vh-140px)]">
      <div className="container">
        <h2 className="center mb-[30px]">
          {user && `Hello, ${user.displayName}`}
        </h2>
        <div className="pb-[10px]">
          <h3 className="center mb-[20px]">Add New Contact</h3>
          <ContactForm onSubmit={formSubmit} />
        </div>
        {userContacts.contactsData ? (
          <ContactsWidgets contactList={userContacts.contactsData} />
        ) : (
          <p>Loading...</p>
        )}
        <div className="center">
          <button className="btn" onClick={signOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(IsLogginedUserPage);
