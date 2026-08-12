import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
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
  const dispatch = useAppDispatch();
  const activeClassName = 'underline text-fiolet';

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
      className: activeClassName,
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
        item.className = activeClassName;
      }
      return item;
    });

    setContactStatusFilters(currentFilters);

    if (e.currentTarget.textContent === 'Active') {
      const filteredContacts = contacts.map(item => ({
        ...item,
        visibility: item.activeStatus,
      }));

      dispatch(filterContactsByStatus(filteredContacts));
    }

    if (e.currentTarget.textContent === 'Inactive') {
      const filteredContacts = contacts.map(item => ({
        ...item,
        visibility: !item.activeStatus,
      }));

      dispatch(filterContactsByStatus(filteredContacts));
    }

    if (e.currentTarget.textContent === 'All') {
      const filteredContacts = contacts.map(item => ({
        ...item,
        visibility: true,
      }));

      dispatch(filterContactsByStatus(filteredContacts));
    }
  };

  return (
    <div className="pb-[40px]">
      <h3 className="center mb-[10px]">Filter contacts by status:</h3>
      <ul className="flex justify-center uppercase">
        {contactStatusFilters.map(({ textContent, id, className }) => {
          return (
            <li
              key={id}
              className="relative px-[10px] after:content-['|'] after:absolute after:right-0 after:-top-px last:after:hidden"
            >
              <a
                href="/"
                onClick={handleContactsByStatus}
                className={`hover:underline hover:text-fiolet ${className}`}
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

export default React.memo(StatusToggler);
