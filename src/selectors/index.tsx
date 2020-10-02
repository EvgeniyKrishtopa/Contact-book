import { RootState } from 'store/reducers';
import { IUser, IContacts } from 'typings/interfaces';

export const getCurrentUser = (state: RootState): IUser => state.user;
export const getCurrentUserContacts = (state: RootState): IContacts =>
  state.contacts;
