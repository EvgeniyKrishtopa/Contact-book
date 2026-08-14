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
} from 'store/firebaseTestMocks';

const snapshotDoc = (id: string, data: Record<string, any>) => ({
  id,
  data: () => data,
});

test('FetchCurrentUserContacts subscribes to the user contact collection and stores each snapshot', () => {
  mockOnSnapshot.mockImplementation((_ref, callback) => {
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

  store.dispatch(FetchCurrentUserContacts('user-1'));

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
    SendContact({
      contactName: 'Jane',
      contactEmail: 'jane@example.com',
      contactPhone: '+380 (11)-111-11-11',
      userId: 'user-1',
    }),
  );

  expect(mockAdd).toHaveBeenCalledWith(expect.anything(), {
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
    SendContact({
      contactName: 'Jane',
      contactEmail: 'jane@example.com',
      contactPhone: '+380 (11)-111-11-11',
      userId: 'user-1',
    }),
  );

  await waitFor(() => expect(store.getState().contacts.error).toEqual(error));
});

test('deleteContactFromBook deletes the contact document', async () => {
  mockDelete.mockResolvedValue(undefined);
  const store = createTestStore();

  await store.dispatch(deleteContactFromBook({ id: '1', userId: 'user-1' }));

  expect(mockDelete).toHaveBeenCalledTimes(1);
});

test('changeContactStatus flips the contact activeStatus', async () => {
  mockUpdate.mockResolvedValue(undefined);
  const store = createTestStore();

  await store.dispatch(
    changeContactStatus({ id: '1', userId: 'user-1', activeStatus: true }),
  );

  expect(mockUpdate).toHaveBeenCalledWith(expect.anything(), {
    activeStatus: false,
  });
});
