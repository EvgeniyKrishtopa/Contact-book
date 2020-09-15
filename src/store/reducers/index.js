import { combineReducers } from 'redux';
import contacts from './contacts';
import user from './user';
import {reducer as formReducer} from 'redux-form';
const reducers = {form: formReducer}
const rootReducer = combineReducers({ contacts, user, reducers });

export default rootReducer;
