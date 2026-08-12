import { combineReducers, Action, ThunkAction } from '@reduxjs/toolkit';
import contacts from './contacts';
import user from './user';

const rootReducer = combineReducers({ user, contacts });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
