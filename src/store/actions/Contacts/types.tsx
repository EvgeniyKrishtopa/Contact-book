import {
  GET_CURRENT_USER_CONTACTS,
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
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

export type ContactActionTypes =
  | IGetCurrentUserContacts
  | IContactSendStarted
  | IContactSendSuccess
  | IContactSendError;
