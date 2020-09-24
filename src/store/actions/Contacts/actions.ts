import firebase from '../../../firebase/firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../reducers';
import { ContactActionTypes } from './types';
import { IError } from '../../../typings/interfaces';

import {
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
  GET_CURRENT_USER_CONTACTS,
} from '../../constants';

const db = firebase.firestore();
type ThunkType = ThunkAction<void, RootState, unknown, ContactActionTypes>;

export const FetchCurrentUserContacts = (id: string): ThunkType => {
  return dispatch => {
    db.collection('users')
      .doc(id)
      .collection('Contacts')
      .onSnapshot(snapshot => {
        const contactItems = snapshot.docs.map(item => {
          const contact = item.data();
          return contact;
        });

        dispatch(FetchContacts(contactItems));
      });
  };
};

const FetchContacts = (contactItems: any): ContactActionTypes => {
  return {
    type: GET_CURRENT_USER_CONTACTS,
    contactsData: contactItems,
  };
};

export const SendContact = (
  contactName: string,
  contactEmail: string,
  contactPhone: string,
  id: string,
): ThunkType => {
  return dispatch => {
    dispatch(contactSendStarted());
    db.collection('users')
      .doc(id)
      .collection('Contacts')
      .add({
        contactName,
        contactEmail,
        contactPhone,
        activeStatus: true,
        id: new Date().getTime(),
      })
      .then(() => {
        dispatch(contactSendSuccess());
      })
      .catch(error => {
        dispatch(contactSendError(error));
      });
  };
};

const contactSendStarted = (): ContactActionTypes => {
  return {
    type: SEND_CONTACT_STARTED,
    loading: true,
  };
};

const contactSendSuccess = (): ContactActionTypes => {
  return {
    type: SEND_CONTACT_SUCCESS,
    loading: false,
    error: null,
  };
};

const contactSendError = (error: IError): ContactActionTypes => {
  return {
    type: SEND_CONTACT_ERROR,
    error,
  };
};
