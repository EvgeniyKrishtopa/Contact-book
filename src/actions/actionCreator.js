import firebase from '../firebase';
import { CONTACT_STATUS_SWITCHER, SELECT_CONTACT, ADD_CONTACT, DELETE_CONTACT, 
  FILTER_CONTACT_STATUS, FETCH_CONTACTS, FETCH_CONTACTS_SUCCESS, LOGIN_USER, 
  CREATE_USER, SIGNOUT_USER, LOGIN_USER_ERROR, CREATE_USER_ERROR
 } from './actionTypes';

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
    result
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
        }
      )
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
      .then(()=> dispatch(addContact()))
  }
}

export function addContact(){
  return {
    type: ADD_CONTACT
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
      .then(()=> dispatch(deleteContact()))
  }}

export function deleteContact () {
  return {
    type: DELETE_CONTACT
  }
}



export const createUser = (email, password) => {
    return async dispatch => {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {dispatch(createNewUser(response.user))})
      .catch(error => dispatch(errorAuth(error.message)))
    }
}

export function createNewUser(newUserData) {
    return {
      type: CREATE_USER,
      newUserData
    }
}

export function errorAuth(errorInfo) {
  return {
    type: CREATE_USER_ERROR,
    errorInfo
  }
}


export const loginUser = (email,password) => {
    return async dispatch => {

      firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => dispatch(fetchLoginUser(response.user)))
        .catch(error => dispatch(errorLogin(error.message)))
    }
}

export function fetchLoginUser(currentUserData) {
    return {
      type: LOGIN_USER,
      currentUserData
    }
}

export function errorLogin(errorInfo) {
   return {
     type: LOGIN_USER_ERROR,
     errorInfo
   }
}


export const signOutUser = () => {
    firebase.auth().signOut();

    return {
      type: SIGNOUT_USER,
      isUserLogged: null
    }
}
