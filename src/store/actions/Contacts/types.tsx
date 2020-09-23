import {
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
} from '../../constants';

import { IError } from '../../../typings/interfaces';

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
  | IContactSendStarted
  | IContactSendSuccess
  | IContactSendError;
