import React from 'react';
import styles from '../styles.module.scss';
import ContactItem from '../contactItem';
import { IContact } from 'typings/interfaces';

const ContactList: React.FC<{ contacts: Array<IContact> }> = ({ contacts }) => {
  return (
    <div className={styles.contactBlock}>
      <h3 className="center">Your contacts:</h3>
      <ul>
        {contacts.map(
          ({
            contactEmail,
            contactName,
            contactPhone,
            activeStatus,
            id,
            visibility,
          }) => {
            return (
              <ContactItem
                contactEmail={contactEmail}
                contactName={contactName}
                contactPhone={contactPhone}
                activeStatus={activeStatus}
                id={id}
                key={id}
                visibility={visibility}
              />
            );
          },
        )}
      </ul>
    </div>
  );
};

export default ContactList;
