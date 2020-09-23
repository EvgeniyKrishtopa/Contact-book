import firebase from '../../../firebase/firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../reducers';
import { ContactActionTypes } from './types';
import { IError } from '../../../typings/interfaces';

import {
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
} from '../../constants';

const db = firebase.firestore();
type ThunkType = ThunkAction<void, RootState, unknown, ContactActionTypes>;

export const SendContact = (
  contactEmail: string,
  contactName: string,
  contactPhone: string,
): ThunkType => {
  return dispatch => {
    dispatch(userSendStarted());
    db.collection('Contacts')
      .add({
        contactName,
        contactEmail,
        contactPhone,
        activeStatus: true,
      })
      .then(() => {
        dispatch(userSendSuccess());
      })
      .catch(error => {
        dispatch(userSendError(error));
      });
  };
};

const userSendStarted = (): ContactActionTypes => {
  return {
    type: SEND_CONTACT_STARTED,
    loading: true,
  };
};

const userSendSuccess = (): ContactActionTypes => {
  return {
    type: SEND_CONTACT_SUCCESS,
    loading: false,
    error: null,
  };
};

const userSendError = (error: IError): ContactActionTypes => {
  return {
    type: SEND_CONTACT_ERROR,
    error,
  };
};
