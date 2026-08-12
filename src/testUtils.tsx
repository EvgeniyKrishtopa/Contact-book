// Shared render/store helpers for smoke tests (not picked up by Jest's
// testMatch since it's neither *.test.* nor inside __tests__/).
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { reducer as formReducer } from 'redux-form';
import contacts from 'store/reducers/contacts';
import user from 'store/reducers/user';
import { RootState } from 'store/reducers';
import { CurrentUserContext } from 'context';
import { IUser } from 'typings/interfaces';

export const defaultCurrentUser: IUser = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: { user, contacts, form: formReducer },
    preloadedState: preloadedState as RootState,
  });

type TestStore = ReturnType<typeof createTestStore>;

export const renderWithStore = (
  ui: React.ReactElement,
  {
    store = createTestStore(),
    currentUser = defaultCurrentUser,
  }: { store?: TestStore; currentUser?: IUser } = {},
): { store: TestStore } & RenderResult => ({
  store,
  ...render(
    <Provider store={store}>
      <CurrentUserContext.Provider value={currentUser}>
        {ui}
      </CurrentUserContext.Provider>
    </Provider>,
  ),
});

export const fakeFirebaseUser = (
  overrides: Record<string, any> = {},
): Record<string, any> => ({
  uid: 'user-1',
  email: 'jane@example.com',
  displayName: 'Jane',
  ...overrides,
});
