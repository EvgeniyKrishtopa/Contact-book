import {
  GET_CURRENT_USER_CONTACTS,
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
} from '../constants';
import { IContacts } from '../../typings/interfaces';
import { ContactActionTypes } from '../actions/Contacts/types';

const CONTACTSSTATE: IContacts = {
  loading: false,
  contactsData: [],
  error: null,
};

const contacts = (
  state = CONTACTSSTATE,
  action: ContactActionTypes,
): IContacts => {
  switch (action.type) {
    case GET_CURRENT_USER_CONTACTS:
      return {
        ...state,
        contactsData: action.contactsData,
      };
    case SEND_CONTACT_STARTED:
      return {
        ...state,
        loading: action.loading,
      };

    case SEND_CONTACT_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        error: null,
      };

    case SEND_CONTACT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};

export default contacts;
