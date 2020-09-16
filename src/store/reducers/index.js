import { combineReducers } from 'redux';
import contacts from './contacts';
import user from './user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({ contacts, user, form: formReducer });

export default rootReducer;
