import React from 'react';
import userEvent from '@testing-library/user-event';
import { renderWithStore, createTestStore } from 'testUtils';
import SelectContact from './index';
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

test('selecting a contact by email hides every other contact', async () => {
  const contacts = [
    contact({ id: '1', contactEmail: 'a@b.com' }),
    contact({ id: '2', contactEmail: 'c@d.com' }),
  ];
  const store = createTestStore({
    contacts: { loading: false, contactsData: contacts, error: null },
  } as any);
  const { getByRole, findByText } = renderWithStore(
    <SelectContact contacts={contacts} />,
    { store },
  );

  const user = userEvent.setup();
  await user.click(getByRole('combobox'));
  await user.click(await findByText('c@d.com'));

  const filtered = store.getState().contacts.contactsData;
  expect(filtered).toEqual([
    contact({ id: '1', contactEmail: 'a@b.com', visibility: false }),
    contact({ id: '2', contactEmail: 'c@d.com', visibility: true }),
  ]);
});
