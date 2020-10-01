import {
  GET_CURRENT_USER_CONTACTS,
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
  DELETE_USER_CONTACT,
  FILTERED_CONTACT_BY_EMAIL,
  CHANGE_CONTACT_STATUS,
  FILTERED_CONTACT_BY_STATUS,
} from 'store/constants';
import { IContacts } from 'typings/interfaces';
import { ContactActionTypes } from 'store/actions/Contacts/types';

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

    case DELETE_USER_CONTACT:
      return {
        ...state,
      };

    case FILTERED_CONTACT_BY_EMAIL:
      return {
        ...state,
        contactsData: action.contactsData,
      };
    case CHANGE_CONTACT_STATUS:
      return {
        ...state,
      };

    case FILTERED_CONTACT_BY_STATUS:
      return {
        ...state,
        contactsData: action.contactsData,
      };

    default:
      return state;
  }
};

export default contacts;
