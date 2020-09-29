import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { useDispatch } from 'react-redux';
import { IContact } from 'typings/interfaces';
import { filterContactsByStatus } from 'store/actions/Contacts/actions';

interface IFilter {
  textContent: string;
  id: number;
  className: string;
}

const StatusToggler: React.FC<{ contacts: Array<IContact> }> = ({
  contacts,
}) => {
  const dispatch = useDispatch();

  const filters: Array<IFilter> = [
    {
      textContent: 'Active',
      id: 1,
      className: '',
    },
    {
      textContent: 'Inactive',
      id: 2,
      className: '',
    },
    {
      textContent: 'All',
      id: 3,
      className: `${styles.active}`,
    },
  ];

  const [contactStatusFilters, setContactStatusFilters] = useState<
    Array<IFilter>
  >(filters);

  const handleContactsByStatus = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const currentFilters = filters.map(item => {
      item.className = '';
      if (item.textContent === e.currentTarget.textContent) {
        item.className = `${styles.active}`;
      }
      return item;
    });

    setContactStatusFilters(currentFilters);

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
        {contactStatusFilters.map(({ textContent, id, className }) => {
          return (
            <li key={id}>
              <a
                href="/"
                onClick={handleContactsByStatus}
                className={className}
              >
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
