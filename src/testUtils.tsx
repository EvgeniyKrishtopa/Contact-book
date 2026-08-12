// Shared render/store helpers for smoke tests (not picked up by Jest's
// testMatch since it's neither *.test.* nor inside __tests__/).
import React from 'react';
import { createStore, applyMiddleware, combineReducers, Store } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { render, RenderResult } from '@testing-library/react';
import { reducer as formReducer } from 'redux-form';
import contacts from 'store/reducers/contacts';
import user from 'store/reducers/user';
import { RootState } from 'store/reducers';
import { CurrentUserContext } from 'context';
import { IUser } from 'typings/interfaces';

const rootReducer = combineReducers({ user, contacts, form: formReducer });

export const defaultCurrentUser: IUser = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

export const createTestStore = (preloadedState?: Partial<RootState>): Store =>
  createStore(rootReducer, preloadedState as RootState, applyMiddleware(thunk));

export const renderWithStore = (
  ui: React.ReactElement,
  {
    store = createTestStore(),
    currentUser = defaultCurrentUser,
  }: { store?: Store; currentUser?: IUser } = {},
): { store: Store } & RenderResult => ({
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
