import React from 'react';
import styles from '../styles.module.scss';
import MaterialIcon from 'material-icons-react';
import Option from './option';

const options = [
  {
    value: 'email1@gmail.com',
  },
  {
    value: 'email2@gmail.com',
  },
  {
    value: 'email3@gmail.com',
  },
];

const SelectContact = () => {
  return (
    <div className={styles.selectHolder}>
      <select>
        {options.map(({ value }) => {
          return <Option value={value} key={value} />;
        })}
      </select>
      <MaterialIcon icon="expand_more" size="30" />
    </div>
  );
};

export default SelectContact;
