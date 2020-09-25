import React from 'react';
import styles from '../styles.module.scss';
import MaterialIcon from 'material-icons-react';
import Option from './option';
import { IContact } from '../../../../typings/interfaces';

const SelectContact: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  return (
    <div className={styles.selectContactBlock}>
      <h3 className="center">Select contact by Email</h3>
      <div className={styles.selectHolder}>
        <select>
          {contacts.map(({ id, contactEmail }) => {
            return <Option email={contactEmail} key={id} />;
          })}
        </select>
        <MaterialIcon icon="expand_more" size="30" />
      </div>
    </div>
  );
};

export default SelectContact;
