import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import styles from '../styles.module.scss';
import Select from 'react-select';
import { filterContact } from 'store/actions/Contacts/actions';
import { IContact } from 'typings/interfaces';

const SelectContact: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const handleChange = ({ value }) => {
    setSelectedOption(value);

    const filteredContacts = contacts.map(item =>
      item.contactEmail !== value ? { ...item, visibility: false } : item,
    );

    dispatch(filterContact(filteredContacts));
  };

  const options = contacts
    .map(item => item.contactEmail)
    .map(item => ({ label: item, value: item }));

  return (
    <div className={styles.selectContactBlock}>
      <h3 className="center">Select contact by Email</h3>
      <Select
        onChange={handleChange}
        defaultValue={selectedOption}
        options={options}
      />
    </div>
  );
};

export default React.memo(SelectContact);
