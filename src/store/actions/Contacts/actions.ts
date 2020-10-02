import firebase from 'store/firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/reducers';
import { ContactActionTypes } from './types';
import { IError, IContact } from 'typings/interfaces';

import {
  SEND_CONTACT_STARTED,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_ERROR,
  GET_CURRENT_USER_CONTACTS,
  DELETE_USER_CONTACT,
  FILTERED_CONTACT_BY_EMAIL,
  CHANGE_CONTACT_STATUS,
  FILTERED_CONTACT_BY_STATUS,
} from 'store/constants';

const db = firebase.firestore();

type ThunkType = ThunkAction<void, RootState, unknown, ContactActionTypes>;

const FetchContacts = (contactItems: any): ContactActionTypes => {
  return {
    type: GET_CURRENT_USER_CONTACTS,
    contactsData: contactItems,
  };
};

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

const deleteContact = (): ContactActionTypes => {
  return {
    type: DELETE_USER_CONTACT,
  };
};

export const deleteContactFromBook = (
  id: string,
  userId: string,
): ThunkType => {
  return async dispatch => {
    db.collection('users')
      .doc(userId)
      .collection('Contacts')
      .doc(id)
      .delete()
      .then(() => dispatch(deleteContact()));
  };
};

export const filterContact = (
  filteredContacts: Array<IContact>,
): ContactActionTypes => {
  return {
    type: FILTERED_CONTACT_BY_EMAIL,
    contactsData: filteredContacts,
  };
};

const changeContact = (): ContactActionTypes => {
  return {
    type: CHANGE_CONTACT_STATUS,
  };
};

export const changeContactStatus = (
  id: string,
  userId: string,
  activeStatus: boolean,
): ThunkType => {
  return async dispatch => {
    db.collection('users')
      .doc(userId)
      .collection('Contacts')
      .doc(id)
      .update({ activeStatus: !activeStatus })
      .then(() => dispatch(changeContact()));
  };
};

export const filterContactsByStatus = (
  filteredContacts: Array<IContact>,
): ContactActionTypes => {
  return {
    type: FILTERED_CONTACT_BY_STATUS,
    contactsData: filteredContacts,
  };
};
