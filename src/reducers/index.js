import { combineReducers } from 'redux';
import contacts from './contacts';
import users from './users';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({ contacts, users, form: formReducer });

export default rootReducer;