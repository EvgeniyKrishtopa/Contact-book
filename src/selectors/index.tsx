import { createSelector } from 'reselect';
import { User } from '../typings/interfaces';
//Should add memoized selector when I'll create filter contacts by status and email
export const getCurrentUser: React.FC = (state): User => state.user;
