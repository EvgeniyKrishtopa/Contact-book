jest.mock('store/firebase');

import { waitFor } from '@testing-library/react';
import { createTestStore } from 'testUtils';
import {
  FetchCurrentUserContacts,
  SendContact,
  deleteContactFromBook,
  changeContactStatus,
} from './actions';
import {
  mockOnSnapshot,
  mockAdd,
  mockDelete,
  mockUpdate,
  resetFirebaseMock,
} from 'store/firebaseTestMocks';

beforeEach(() => {
  resetFirebaseMock();
});

const snapshotDoc = (id: string, data: Record<string, any>) => ({
  id,
  data: () => data,
});

test('FetchCurrentUserContacts subscribes to the user contact collection and stores each snapshot', () => {
  mockOnSnapshot.mockImplementation(callback => {
    callback({
      docs: [
        snapshotDoc('1', {
          contactName: 'Jane',
          contactEmail: 'jane@example.com',
          contactPhone: '+380 (11)-111-11-11',
          activeStatus: true,
          visibility: true,
        }),
      ],
    });
  });
  const store = createTestStore();

  store.dispatch(FetchCurrentUserContacts('user-1') as any);

  expect(store.getState().contacts.contactsData).toEqual([
    {
      id: '1',
      contactName: 'Jane',
      contactEmail: 'jane@example.com',
      contactPhone: '+380 (11)-111-11-11',
      activeStatus: true,
      visibility: true,
    },
  ]);
});

test('SendContact writes a new contact document and clears the loading flag on success', async () => {
  mockAdd.mockResolvedValue(undefined);
  const store = createTestStore();

  store.dispatch(
    SendContact(
      'Jane',
      'jane@example.com',
      '+380 (11)-111-11-11',
      'user-1',
    ) as any,
  );

  expect(mockAdd).toHaveBeenCalledWith({
    contactName: 'Jane',
    contactEmail: 'jane@example.com',
    contactPhone: '+380 (11)-111-11-11',
    activeStatus: true,
    visibility: true,
  });
  await waitFor(() => expect(store.getState().contacts.loading).toBe(false));
  expect(store.getState().contacts.error).toBeNull();
});

test('SendContact records the Firebase error on failure', async () => {
  const error = { message: 'Failed to save' };
  mockAdd.mockRejectedValue(error);
  const store = createTestStore();

  store.dispatch(
    SendContact(
      'Jane',
      'jane@example.com',
      '+380 (11)-111-11-11',
      'user-1',
    ) as any,
  );

  await waitFor(() => expect(store.getState().contacts.error).toEqual(error));
});

test('deleteContactFromBook deletes the contact document', async () => {
  mockDelete.mockResolvedValue(undefined);
  const store = createTestStore();

  await store.dispatch(deleteContactFromBook('1', 'user-1') as any);

  expect(mockDelete).toHaveBeenCalledTimes(1);
});

test('changeContactStatus flips the contact activeStatus', async () => {
  mockUpdate.mockResolvedValue(undefined);
  const store = createTestStore();

  await store.dispatch(changeContactStatus('1', 'user-1', true) as any);

  expect(mockUpdate).toHaveBeenCalledWith({ activeStatus: false });
});
