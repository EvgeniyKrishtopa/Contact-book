jest.mock('store/firebase');

import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { fireEvent, wait } from '@testing-library/react';
import { renderWithStore, createTestStore, fakeFirebaseUser } from 'testUtils';
import Authentication from './index';
import {
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  resetFirebaseMock,
} from 'store/firebaseTestMocks';

beforeEach(() => {
  resetFirebaseMock();
});

const renderAuthPage = (
  path: '/login' | '/register',
  store = createTestStore(),
) =>
  renderWithStore(
    <MemoryRouter initialEntries={[path]}>
      <Route path={path} component={Authentication} />
    </MemoryRouter>,
    { store },
  );

test('logging in with valid credentials calls Firebase sign-in with the entered values', () => {
  mockSignInWithEmailAndPassword.mockResolvedValue({
    user: fakeFirebaseUser(),
  });
  const { getByPlaceholderText, getByText } = renderAuthPage('/login');

  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'secret1' },
  });
  fireEvent.click(getByText('Login'));

  expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
    'jane@example.com',
    'secret1',
  );
});

test('submitting the login form with an invalid email shows a validation error and does not call Firebase', () => {
  const { getByPlaceholderText, getByText } = renderAuthPage('/login');

  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'not-an-email' },
  });
  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'secret1' },
  });
  fireEvent.click(getByText('Login'));

  expect(getByText('Invalid email address!')).toBeInTheDocument();
  expect(mockSignInWithEmailAndPassword).not.toHaveBeenCalled();
});

test('registering with valid details calls Firebase sign-up and sets the display name', async () => {
  const fakeUser = fakeFirebaseUser({ displayName: null });
  mockCreateUserWithEmailAndPassword.mockResolvedValue({ user: fakeUser });
  const { getByPlaceholderText, getByText } = renderAuthPage('/register');

  fireEvent.change(getByPlaceholderText('Login'), {
    target: { value: 'jane' },
  });
  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'secret1' },
  });
  fireEvent.click(getByText('Register'));

  expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
    'jane@example.com',
    'secret1',
  );
  await wait(() =>
    expect(fakeUser.updateProfile).toHaveBeenCalledWith({
      displayName: 'jane',
    }),
  );
});

test('an existing sign-in error from the current-user context is shown on the page', () => {
  const { getByText } = renderWithStore(
    <MemoryRouter initialEntries={['/login']}>
      <Route path="/login" component={Authentication} />
    </MemoryRouter>,
    {
      currentUser: {
        loading: false,
        userData: null,
        error: { message: 'Invalid credentials' },
        isLoginnedUser: false,
      },
    },
  );

  expect(getByText('Invalid credentials')).toBeInTheDocument();
});
