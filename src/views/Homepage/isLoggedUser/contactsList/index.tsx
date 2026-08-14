import React from 'react';
import ContactItem from '../contactItem';
import { IContact } from 'typings/interfaces';

const ContactList: React.FC<{ contacts: Array<IContact> }> = ({ contacts }) => {
  const filterdContacts = contacts.filter(item => item.visibility === true);

  return (
    <div className="pb-[40px]">
      {filterdContacts.length >= 1 && (
        <>
          <h3 className="center mb-[20px]">Your contacts:</h3>
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
        </>
      )}
    </div>
  );
};

export default React.memo(ContactList);
