import React from 'react';
import { useAppDispatch } from 'store/hooks';
import Select, { SingleValue } from 'react-select';
import { filterContact } from 'store/actions/Contacts/actions';
import { IContact } from 'typings/interfaces';

interface IContactOption {
  label: string;
  value: string;
}

const SelectContact: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = (option: SingleValue<IContactOption>) => {
    const value = option?.value ?? null;

    const filteredContacts = contacts.map(item =>
      item.contactEmail !== value ? { ...item, visibility: false } : item,
    );

    dispatch(filterContact(filteredContacts));
  };

  const options: Array<IContactOption> = contacts
    .map(item => item.contactEmail)
    .map(item => ({ label: item, value: item }));

  return (
    <div className="mb-[40px]">
      <h3 className="center mb-[20px]">Select contact by Email</h3>
      <Select onChange={handleChange} options={options} />
    </div>
  );
};

export default React.memo(SelectContact);
