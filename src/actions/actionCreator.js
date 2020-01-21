import firebase from '../firebase';
import { CONTACT_STATUS_SWITCHER, SELECT_CONTACT, FILTER_CONTACT_STATUS, FETCH_CONTACTS, FETCH_CONTACTS_SUCCESS } from '../constants';


export const statusSwitch = id => ({
  type: CONTACT_STATUS_SWITCHER,
  id
});

export const selectContact = id => ({
  type: SELECT_CONTACT,
  id
})

export const filterStatus = statusFilter => ({
  type: FILTER_CONTACT_STATUS,
  statusFilter
});

export function fetchContactsStart() {
 return {
   type: FETCH_CONTACTS
 }
}

export function fetchContactsSuccess(result) {
  return {
    type: FETCH_CONTACTS_SUCCESS,
    result,
  }
}

export const asyncFetchData = userId => {
  return async dispatch => {
    dispatch(fetchContactsStart());

    firebase
      .firestore()
      .collection ('users')
      .doc(userId)
      .collection('contacts')
      .onSnapshot(snapshot => {
        const contactItems = snapshot.docs.map(item => {
    
          const contact = item.data();
          contact.id = item.id;
          return contact;
        });

        dispatch(fetchContactsSuccess(contactItems));
      })
  }
}

export const asyncAddContact = (name, tel, email, status, itemVisibility, userId) => {
  return async dispatch => {
    firebase
      .firestore()
      .collection ('users')
      .doc(userId)
      .collection('contacts')
      .add({
        name, 
        tel, 
        email, 
        status, 
        itemVisibility,
        userId
      })
  }
}

export const asyncDeleteContact = (id, userId) => {

  return async dispatch => {

    firebase
      .firestore()
      .collection ('users')
      .doc(userId)
      .collection('contacts')
      .doc(id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
    })
    
  }}