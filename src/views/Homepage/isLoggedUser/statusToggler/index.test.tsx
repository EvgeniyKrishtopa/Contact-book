import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithStore, createTestStore } from 'testUtils';
import StatusToggler from './index';
import { IContact } from 'typings/interfaces';

const contact = (overrides: Partial<IContact> = {}): IContact => ({
  activeStatus: true,
  contactEmail: 'a@b.com',
  contactName: 'A',
  contactPhone: '+380 (11)-111-11-11',
  visibility: true,
  id: '1',
  ...overrides,
});

const renderToggler = (contacts: Array<IContact>) => {
  const store = createTestStore({
    contacts: { loading: false, contactsData: contacts, error: null },
  } as any);
  return renderWithStore(<StatusToggler contacts={contacts} />, { store });
};

test('filtering by "Active" shows only contacts with an active status', () => {
  const contacts = [
    contact({ id: '1', activeStatus: true, visibility: false }),
    contact({ id: '2', activeStatus: false, visibility: false }),
  ];
  const { store, getByText } = renderToggler(contacts);

  fireEvent.click(getByText('Active'));

  expect(store.getState().contacts.contactsData).toEqual([
    contact({ id: '1', activeStatus: true, visibility: true }),
    contact({ id: '2', activeStatus: false, visibility: false }),
  ]);
});

test('filtering by "All" makes every contact visible again', () => {
  const contacts = [
    contact({ id: '1', activeStatus: true, visibility: false }),
    contact({ id: '2', activeStatus: false, visibility: false }),
  ];
  const { store, getByText } = renderToggler(contacts);

  fireEvent.click(getByText('All'));

  expect(store.getState().contacts.contactsData).toEqual([
    contact({ id: '1', activeStatus: true, visibility: true }),
    contact({ id: '2', activeStatus: false, visibility: true }),
  ]);
});
