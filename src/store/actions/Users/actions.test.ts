import { waitFor } from '@testing-library/react';
import { createTestStore, fakeFirebaseUser } from 'testUtils';
import { LogIn, SignUp, LogOut, IsLogIn } from './actions';
import {
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockSignOut,
  mockOnAuthStateChanged,
  mockUpdateProfile,
} from 'store/firebaseTestMocks';

test('LogIn signs the user in and stores the resolved user on success', async () => {
  const fakeUser = fakeFirebaseUser();
  mockSignInWithEmailAndPassword.mockResolvedValue({ user: fakeUser });
  const store = createTestStore();

  store.dispatch(LogIn({ userEmail: 'jane@example.com', userPassword: 'secret1' }));

  expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
    expect.anything(),
    'jane@example.com',
    'secret1',
  );
  await waitFor(() => expect(store.getState().user.isLoginnedUser).toBe(true));
  expect(store.getState().user.userData).toEqual(fakeUser);
  expect(store.getState().user.error).toBeNull();
});

test('LogIn records the Firebase error on failure without logging the user in', async () => {
  const error = { code: 'auth/wrong-password', message: 'Invalid credentials' };
  mockSignInWithEmailAndPassword.mockRejectedValue(error);
  const store = createTestStore();

  store.dispatch(LogIn({ userEmail: 'jane@example.com', userPassword: 'wrong' }));

  await waitFor(() => expect(store.getState().user.error).toEqual(error));
  expect(store.getState().user.isLoginnedUser).toBe(false);
});

test('SignUp creates the account, sets the display name, and logs the user in', async () => {
  const fakeUser = fakeFirebaseUser({ displayName: null });
  mockCreateUserWithEmailAndPassword.mockResolvedValue({ user: fakeUser });
  mockUpdateProfile.mockResolvedValue(undefined);
  const store = createTestStore();

  store.dispatch(
    SignUp({
      userEmail: 'jane@example.com',
      userPassword: 'secret1',
      userLogin: 'jane',
    }),
  );

  expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
    expect.anything(),
    'jane@example.com',
    'secret1',
  );
  await waitFor(() =>
    expect(mockUpdateProfile).toHaveBeenCalledWith(fakeUser, {
      displayName: 'jane',
    }),
  );
  await waitFor(() => expect(store.getState().user.isLoginnedUser).toBe(true));
  expect(store.getState().user.userData).toEqual(fakeUser);
});

test('SignUp records the Firebase error on failure', async () => {
  const error = { code: 'auth/email-already-in-use', message: 'Email taken' };
  mockCreateUserWithEmailAndPassword.mockRejectedValue(error);
  const store = createTestStore();

  store.dispatch(
    SignUp({
      userEmail: 'jane@example.com',
      userPassword: 'secret1',
      userLogin: 'jane',
    }),
  );

  await waitFor(() => expect(store.getState().user.error).toEqual(error));
});

test('LogOut signs the user out and clears the session', async () => {
  mockSignOut.mockResolvedValue(undefined);
  const store = createTestStore({
    user: {
      loading: false,
      userData: fakeFirebaseUser(),
      error: null,
      isLoginnedUser: true,
    },
  } as any);

  store.dispatch(LogOut());

  await waitFor(() => expect(store.getState().user.isLoginnedUser).toBe(false));
  expect(store.getState().user.userData).toBeNull();
});

test('IsLogIn restores a persisted session when Firebase reports a signed-in user', async () => {
  const fakeUser = fakeFirebaseUser();
  mockOnAuthStateChanged.mockImplementation((_auth, callback) =>
    callback(fakeUser),
  );
  const store = createTestStore();

  store.dispatch(IsLogIn());

  await waitFor(() => expect(store.getState().user.isLoginnedUser).toBe(true));
  expect(store.getState().user.userData).toEqual(fakeUser);
});

test('IsLogIn reports no session when Firebase has no signed-in user', async () => {
  mockOnAuthStateChanged.mockImplementation((_auth, callback) =>
    callback(null),
  );
  const store = createTestStore();

  store.dispatch(IsLogIn());

  await waitFor(() => expect(store.getState().user.isLoginnedUser).toBe(false));
});
