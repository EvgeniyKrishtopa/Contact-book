import { combineReducers } from 'redux';
import contacts from './contacts';
import user from './user';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({ user, contacts, form: formReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
