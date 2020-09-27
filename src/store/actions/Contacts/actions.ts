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
  DELETE_USER_CONTACT,
  FILTERED_CONTACT_BY_EMAIL,
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
          contact.id = item.id;
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
  userId: string,
): ThunkType => {
  return dispatch => {
    dispatch(contactSendStarted());
    db.collection('users')
      .doc(userId)
      .collection('Contacts')
      .add({
        contactName,
        contactEmail,
        contactPhone,
        activeStatus: true,
        visibility: true,
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

export const deleteContactFromBook = (id: string, userId: string) => {
  return async dispatch => {
    db.collection('users')
      .doc(userId)
      .collection('Contacts')
      .doc(id)
      .delete()
      .then(() => dispatch(deleteContact()));
  };
};

const deleteContact = (): ContactActionTypes => {
  return {
    type: DELETE_USER_CONTACT,
  };
};

export const filterContact = (filteredContacts: any): ContactActionTypes => {
  return {
    type: FILTERED_CONTACT_BY_EMAIL,
    contactsData: filteredContacts,
  };
};
