import contacts from './contacts';
import {
  GET_CURRENT_USER_CONTACTS,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
  FILTERED_CONTACT_BY_EMAIL,
  FILTERED_CONTACT_BY_STATUS,
} from 'store/constants';
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
  expect(contacts(undefined, { type: '@@INIT' } as any)).toEqual(INITIAL_STATE);
});

test('GET_CURRENT_USER_CONTACTS replaces the contact list from a snapshot', () => {
  const contactsData = [contact()];
  const state = contacts(INITIAL_STATE, {
    type: GET_CURRENT_USER_CONTACTS,
    contactsData,
  } as any);
  expect(state.contactsData).toEqual(contactsData);
});

test('SEND_CONTACT_SUCCESS clears loading and error', () => {
  const state = contacts(
    { ...INITIAL_STATE, loading: true, error: { message: 'x' } },
    { type: SEND_CONTACT_SUCCESS, loading: false, error: null } as any,
  );
  expect(state.loading).toBe(false);
  expect(state.error).toBeNull();
});

test('SEND_CONTACT_ERROR records the error', () => {
  const error = { message: 'Failed to save' };
  const state = contacts(INITIAL_STATE, {
    type: SEND_CONTACT_ERROR,
    error,
  } as any);
  expect(state.error).toEqual(error);
});

test('FILTERED_CONTACT_BY_EMAIL narrows visibility to the selected contact', () => {
  const contactsData = [
    contact({ id: '1', contactEmail: 'a@b.com', visibility: true }),
    contact({ id: '2', contactEmail: 'c@d.com', visibility: false }),
  ];
  const state = contacts(
    {
      ...INITIAL_STATE,
      contactsData: [contact({ id: '1' }), contact({ id: '2' })],
    },
    { type: FILTERED_CONTACT_BY_EMAIL, contactsData } as any,
  );
  expect(state.contactsData).toEqual(contactsData);
});

test('FILTERED_CONTACT_BY_STATUS replaces the list with the filtered visibility set', () => {
  const contactsData = [
    contact({ id: '1', activeStatus: true, visibility: true }),
    contact({ id: '2', activeStatus: false, visibility: false }),
  ];
  const state = contacts(INITIAL_STATE, {
    type: FILTERED_CONTACT_BY_STATUS,
    contactsData,
  } as any);
  expect(state.contactsData).toEqual(contactsData);
});
