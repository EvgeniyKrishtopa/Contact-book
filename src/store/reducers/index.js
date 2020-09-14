import { combineReducers } from 'redux';
import contacts from './contacts';
import user from './user';

const rootReducer = combineReducers({ contacts, user });

export default rootReducer;
