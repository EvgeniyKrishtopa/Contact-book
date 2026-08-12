import contacts, {
  contactsReceived,
  filterContact,
  filterContactsByStatus,
} from './contacts';
import { IContact } from 'typings/interfaces';

const INITIAL_STATE = {
  loading: false,
  contactsData: [],
  error: null,
};

const contact = (overrides: Partial<IContact> = {}): IContact => ({
  activeStatus: true,
  contactEmail: 'a@b.com',
  contactName: 'A',
  contactPhone: '+380 (11)-111-11-11',
  visibility: true,
  id: '1',
  ...overrides,
});

test('returns the initial state by default', () => {
  expect(contacts(undefined, { type: '@@INIT' } as any)).toEqual(
    INITIAL_STATE,
  );
});

test('contactsReceived replaces the contact list from a snapshot', () => {
  const contactsData = [contact()];
  const state = contacts(INITIAL_STATE, contactsReceived(contactsData));
  expect(state.contactsData).toEqual(contactsData);
});

test('filterContact narrows visibility to the selected contact', () => {
  const contactsData = [
    contact({ id: '1', contactEmail: 'a@b.com', visibility: true }),
    contact({ id: '2', contactEmail: 'c@d.com', visibility: false }),
  ];
  const state = contacts(
    {
      ...INITIAL_STATE,
      contactsData: [contact({ id: '1' }), contact({ id: '2' })],
    },
    filterContact(contactsData),
  );
  expect(state.contactsData).toEqual(contactsData);
});

test('filterContactsByStatus replaces the list with the filtered visibility set', () => {
  const contactsData = [
    contact({ id: '1', activeStatus: true, visibility: true }),
    contact({ id: '2', activeStatus: false, visibility: false }),
  ];
  const state = contacts(INITIAL_STATE, filterContactsByStatus(contactsData));
  expect(state.contactsData).toEqual(contactsData);
});
