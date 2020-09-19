import React, { createContext } from 'react';
import { User } from '../typings/interfaces';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../selectors';
import { RootState } from '../store/reducers';

const user = useSelector<RootState, User>(state => getCurrentUser(state));
export const CurrentUserContext = createContext<User>(user);
