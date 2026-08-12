import user, { isLoginStarted, isLoginSuccess, isLoginError } from './user';

const INITIAL_STATE = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

test('returns the initial state by default', () => {
  expect(user(undefined, { type: '@@INIT' } as any)).toEqual(INITIAL_STATE);
});

test('isLoginStarted flips loading on', () => {
  const state = user(INITIAL_STATE, isLoginStarted());
  expect(state.loading).toBe(true);
});

test('isLoginSuccess restores a persisted session', () => {
  const fakeUser = { uid: '3' } as any;
  const state = user(INITIAL_STATE, isLoginSuccess(fakeUser));
  expect(state.userData).toEqual(fakeUser);
  expect(state.isLoginnedUser).toBe(true);
  expect(state.loading).toBe(false);
  expect(state.error).toBeNull();
});

test('isLoginError marks no session as found', () => {
  const loggedIn = { ...INITIAL_STATE, isLoginnedUser: true };
  const state = user(loggedIn, isLoginError());
  expect(state.isLoginnedUser).toBe(false);
});
