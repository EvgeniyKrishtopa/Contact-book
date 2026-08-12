import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithStore, createTestStore } from 'testUtils';
import IsLogginedUserPage from './index';
import { IContact } from 'typings/interfaces';
import {
  mockAdd,
  mockDelete,
  mockUpdate,
  mockOnSnapshot,
  mockSignOut,
} from 'store/firebaseTestMocks';
import { mockPush } from 'routerTestMocks';

beforeEach(() => {
  mockOnSnapshot.mockImplementation(() => undefined);
});

const contact = (overrides: Partial<IContact> = {}): IContact => ({
  activeStatus: true,
  contactEmail: 'jane@example.com',
  contactName: 'Jane',
  contactPhone: '+380 (11)-111-11-11',
  visibility: true,
  id: '1',
  ...overrides,
});

const currentUser = {
  loading: false,
  userData: { uid: 'user-1', displayName: 'Jane' },
  error: null,
  isLoginnedUser: true,
};

const renderHomepage = (contactsData: Array<IContact>) => {
  const store = createTestStore({
    contacts: { loading: false, contactsData, error: null },
  } as any);
  return renderWithStore(
    <IsLogginedUserPage user={currentUser.userData} />,
    { store, currentUser },
  );
};

test('renders the signed-in user greeting and their visible contacts', () => {
  const { getByText } = renderHomepage([
    contact({ id: '1', contactName: 'Jane' }),
    contact({ id: '2', contactName: 'John', contactEmail: 'john@example.com' }),
  ]);

  expect(getByText('Hello, Jane')).toBeInTheDocument();
  expect(getByText('Jane')).toBeInTheDocument();
  expect(getByText('John')).toBeInTheDocument();
});

test('submitting the add-contact form saves a new contact for the current user', () => {
  mockAdd.mockResolvedValue(undefined);
  const { getByPlaceholderText, getByText } = renderHomepage([]);

  fireEvent.change(getByPlaceholderText('Contact Name'), {
    target: { value: 'Jane' },
  });
  fireEvent.change(getByPlaceholderText('ContactEmail'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(getByPlaceholderText('+380 (XX)-XXX-XX-XX'), {
    target: { value: '+380 (11)-111-11-11' },
  });
  fireEvent.click(getByText('Submit Contact'));

  expect(mockAdd).toHaveBeenCalledWith(expect.anything(), {
    contactName: 'Jane',
    contactEmail: 'jane@example.com',
    contactPhone: '+380 (11)-111-11-11',
    activeStatus: true,
    visibility: true,
  });
});

// Button order on the page: [Submit Contact, status-toggle, delete, Log Out].
test('deleting a contact removes it via Firestore', () => {
  mockDelete.mockResolvedValue(undefined);
  const { getAllByRole } = renderHomepage([contact()]);

  const [, , deleteButton] = getAllByRole('button');
  fireEvent.click(deleteButton);

  expect(mockDelete).toHaveBeenCalledTimes(1);
});

test('toggling a contact status updates it via Firestore', () => {
  mockUpdate.mockResolvedValue(undefined);
  const { getAllByRole } = renderHomepage([contact({ activeStatus: true })]);

  const [, statusButton] = getAllByRole('button');
  fireEvent.click(statusButton);

  expect(mockUpdate).toHaveBeenCalledWith(expect.anything(), {
    activeStatus: false,
  });
});

// Visibility is CSS-driven (a hiddenContact/visibleContact class swap, see
// contactsList/index.tsx): every contact stays mounted, so this asserts the
// class change rather than DOM presence.
test('filtering contacts by status marks non-matching contacts as hidden', async () => {
  const { getByText } = renderHomepage([
    contact({ id: '1', contactName: 'Jane', activeStatus: true }),
    contact({ id: '2', contactName: 'John', activeStatus: false }),
  ]);

  const janeItem = () => getByText('Jane').closest('li');
  const johnItem = () => getByText('John').closest('li');

  expect(janeItem()).toHaveClass('visibleContact');
  expect(johnItem()).toHaveClass('visibleContact');

  fireEvent.click(getByText('Inactive'));

  await waitFor(() => expect(janeItem()).toHaveClass('hiddenContact'));
  expect(johnItem()).toHaveClass('visibleContact');
});

test('signing out logs the user out via Firebase and navigates to the start page', async () => {
  mockSignOut.mockResolvedValue(undefined);
  const { getByText } = renderHomepage([]);

  fireEvent.click(getByText('Log Out'));

  expect(mockSignOut).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
});
