import { createSelector } from 'reselect';
import { RootState } from '../store/reducers';
//Should add memoized selector when I'll create filter contacts by status and email
export const getCurrentUser = (state: RootState) => state.user;
