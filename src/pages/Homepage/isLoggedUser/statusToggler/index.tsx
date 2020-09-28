import React from 'react';
import styles from '../styles.module.scss';
import { useDispatch } from 'react-redux';
import { IContact } from '../../../../typings/interfaces';
import { filterContactsByStatus } from '../../../../store/actions/Contacts/actions';

interface IFilter {
  textContent: string;
  id: number;
}

const StatusToggler: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  const dispatch = useDispatch();

  const filters: Array<IFilter> = [
    {
      textContent: 'Active',
      id: 1,
    },
    {
      textContent: 'Inactive',
      id: 2,
    },
    {
      textContent: 'All',
      id: 3,
    },
  ];

  const handleContactsByStatus = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (e.currentTarget.textContent === 'Active') {
      const filteredContacts = contacts.map(item => {
        item.visibility = false;

        if (item.activeStatus) {
          item.visibility = true;
        }

        return item;
      });

      dispatch(filterContactsByStatus(filteredContacts));
    }

    if (e.currentTarget.textContent === 'Inactive') {
      const filteredContacts = contacts.map(item => {
        item.visibility = false;

        if (!item.activeStatus) {
          item.visibility = true;
        }

        return item;
      });

      dispatch(filterContactsByStatus(filteredContacts));
    }

    if (e.currentTarget.textContent === 'All') {
      const filteredContacts = contacts.map(item => {
        item.visibility = true;
        return item;
      });

      dispatch(filterContactsByStatus(filteredContacts));
    }
  };

  return (
    <div className={styles.contactStatusFilter}>
      <h3 className="center">Filter contacts by status:</h3>
      <ul className={styles.contactsToggler}>
        {filters.map(({ textContent, id }) => {
          return (
            <li key={id}>
              <a href="/" onClick={handleContactsByStatus}>
                {textContent}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StatusToggler;
