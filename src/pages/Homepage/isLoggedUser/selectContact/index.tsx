import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles.module.scss';
import Select from 'react-select';
import { filterContact } from '../../../../store/actions/Contacts/actions';
import { IContact } from '../../../../typings/interfaces';

const SelectContact: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const dispatch = useDispatch();

  const handleChange = ({ value }) => {
    setSelectedOption(value);

    const filteredContacts = contacts.map(item => {
      if (item.contactEmail !== value) {
        item.visibility = false;
      }

      return item;
    });

    dispatch(filterContact(filteredContacts));
  };

  const options = contacts
    .map(item => item.contactEmail)
    .map(item => new Object({ label: item, value: item }));

  return (
    <div className={styles.selectContactBlock}>
      <h3 className="center">Select contact by Email</h3>
      <div className={styles.selectHolder}>
        <Select
          onChange={handleChange}
          defaultValue={selectedOption}
          options={options}
        />
      </div>
    </div>
  );
};

export default SelectContact;
