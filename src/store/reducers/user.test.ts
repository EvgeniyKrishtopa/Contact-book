import user from './user';
import {
  LOG_IN_STARTED,
  LOG_IN_SUCCESS,
  LOG_IN_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_OUT_SUCCESS,
  IS_LOG_IN_SUCCESS,
  IS_LOG_IN_ERROR,
} from 'store/constants';

const INITIAL_STATE = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

test('returns the initial state by default', () => {
  expect(user(undefined, { type: '@@INIT' } as any)).toEqual(INITIAL_STATE);
});

test('LOG_IN_STARTED flips loading on', () => {
  const state = user(INITIAL_STATE, {
    type: LOG_IN_STARTED,
    loading: true,
  } as any);
  expect(state.loading).toBe(true);
});

test('LOG_IN_SUCCESS stores the user and clears loading/error', () => {
  const fakeUser = { uid: '1', displayName: 'Jane' };
  const state = user(INITIAL_STATE, {
    type: LOG_IN_SUCCESS,
    userData: fakeUser,
    loading: false,
    error: null,
    isLoginnedUser: true,
  } as any);
  expect(state).toEqual({
    loading: false,
    userData: fakeUser,
    error: null,
    isLoginnedUser: true,
  });
});

test('LOG_IN_ERROR records the error without touching the rest of the state', () => {
  const error = { message: 'Invalid credentials' };
  const state = user(INITIAL_STATE, { type: LOG_IN_ERROR, error } as any);
  expect(state.error).toEqual(error);
  expect(state.userData).toBeNull();
});

test('SIGN_UP_SUCCESS logs the newly registered user in', () => {
  const fakeUser = { uid: '2', displayName: 'John' };
  const state = user(INITIAL_STATE, {
    type: SIGN_UP_SUCCESS,
    userData: fakeUser,
    loading: false,
    error: null,
    isLoginnedUser: true,
  } as any);
  expect(state.userData).toEqual(fakeUser);
  expect(state.isLoginnedUser).toBe(true);
});

test('SIGN_OUT_SUCCESS clears the user', () => {
  const loggedIn = {
    loading: false,
    userData: { uid: '1' },
    error: null,
    isLoginnedUser: true,
  };
  const state = user(loggedIn, {
    type: SIGN_OUT_SUCCESS,
    userData: null,
    loading: false,
    error: null,
    isLoginnedUser: false,
  } as any);
  expect(state).toEqual(INITIAL_STATE);
});

test('IS_LOG_IN_SUCCESS restores a persisted session', () => {
  const fakeUser = { uid: '3' };
  const state = user(INITIAL_STATE, {
    type: IS_LOG_IN_SUCCESS,
    userData: fakeUser,
    loading: false,
    error: null,
    isLoginnedUser: true,
  } as any);
  expect(state.userData).toEqual(fakeUser);
  expect(state.isLoginnedUser).toBe(true);
});

test('IS_LOG_IN_ERROR marks no session as found', () => {
  const state = user(INITIAL_STATE, {
    type: IS_LOG_IN_ERROR,
    isLoginnedUser: false,
  } as any);
  expect(state.isLoginnedUser).toBe(false);
});
