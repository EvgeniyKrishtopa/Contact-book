import {  CONTACT_STATUS_SWITCHER, SELECT_CONTACT, FILTER_CONTACT_STATUS, FETCH_CONTACTS, FETCH_CONTACTS_SUCCESS } from '../constants';

const CONTACTLIST = {
  contactItems: [],
  loading: false
};

const contacts = (state=CONTACTLIST, { type, id, statusFilter, result }) => {
  switch(type) {

    case CONTACT_STATUS_SWITCHER :
      return {
        ...state, contactItems: [...state.contactItems.map(contact => {
          if(contact.id === id) {
            contact.status = !contact.status;
          }
          return contact;
        })]
      }

    case SELECT_CONTACT :
      return {
        ...state, contactItems: [...state.contactItems.map(item => {
          item.itemVisibility = false;
  
          if(item.id === id){
            item.itemVisibility = true;
          }
  
          return item;
        })]
      }

    case FILTER_CONTACT_STATUS :
        if(statusFilter === 'All') {
          return {
            ...state, contactItems: [...state.contactItems.map(item => {
              item.itemVisibility = true;
              return item;
            })]
          } 
        }

        if(statusFilter === 'Active') {
          return {
            ...state, contactItems: [...state.contactItems.map(item => {
              item.itemVisibility = false;
  
              if(item.status) {
                item.itemVisibility = true;
              }
  
              return item;
            })]
          }
        }
        if(statusFilter === 'Inactive') {
          return {
            ...state, contactItems: [...state.contactItems.map(item => {
              item.itemVisibility = false;
  
              if(!item.status) {
                item.itemVisibility = true;
              }
  
              return item;
            })]
          }
        }
    break
    case FETCH_CONTACTS :
        return {
            ...state, 
            loading: true
        } 
        
    case FETCH_CONTACTS_SUCCESS :
        return {
          ...state, 
          loading: false,
          contactItems: result
        }

    default:
      return state;
    }
}

export default contacts;