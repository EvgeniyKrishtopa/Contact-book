import { combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import contacts from './contacts';
import user from './user';

const rootReducer = combineReducers({ user, contacts, form: formReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
