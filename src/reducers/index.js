import { combineReducers } from 'redux';
import contacts from './contacts';
import users from './users';

const rootReducer = combineReducers({ contacts, users });

export default rootReducer;