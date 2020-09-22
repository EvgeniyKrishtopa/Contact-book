import { createContext } from 'react';
import { IUser } from '../typings/interfaces';

export const CurrentUserContext = createContext<IUser>({
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
});
