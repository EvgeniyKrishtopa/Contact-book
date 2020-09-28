import {
  GET_CURRENT_USER_CONTACTS,
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
  DELETE_USER_CONTACT,
  FILTERED_CONTACT_BY_EMAIL,
  CHANGE_CONTACT_STATUS,
} from '../../constants';

import { IError, IContact } from '../../../typings/interfaces';

interface IGetCurrentUserContacts {
  type: typeof GET_CURRENT_USER_CONTACTS;
  contactsData: Array<IContact> | [];
}

interface IContactSendStarted {
  type: typeof SEND_CONTACT_STARTED;
  loading: boolean;
}

interface IContactSendSuccess {
  type: typeof SEND_CONTACT_SUCCESS;
  loading: boolean;
  error: null;
}

interface IContactSendError {
  type: typeof SEND_CONTACT_ERROR;
  error: IError;
}

interface IDeleteContact {
  type: typeof DELETE_USER_CONTACT;
}

interface IFilteredContactByEmail {
  type: typeof FILTERED_CONTACT_BY_EMAIL;
  contactsData: Array<IContact> | [];
}

interface IChangeContactStatus {
  type: typeof CHANGE_CONTACT_STATUS;
}

export type ContactActionTypes =
  | IGetCurrentUserContacts
  | IContactSendStarted
  | IContactSendSuccess
  | IContactSendError
  | IDeleteContact
  | IFilteredContactByEmail
  | IChangeContactStatus;
