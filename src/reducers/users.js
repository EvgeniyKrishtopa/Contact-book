import {LOGIN_USER, CREATE_USER, SIGNOUT_USER, LOGIN_ERROR} from '../constants';

const USER = {
    user: null,
    errorNotification:''
};

const users = (state=USER, { type, currentUserData, newUserData, isUserLogged, errorInfo}) => {
  switch(type) {
    case LOGIN_USER :
      return {
        ...state, user: currentUserData
      }
    case CREATE_USER :
      return {
        ...state, user: newUserData
      }
    case SIGNOUT_USER :
      return {
        ...state, user: isUserLogged
      }
    case LOGIN_ERROR : 
      return {
        ...state,errorNotification: errorInfo
      }

    default:
        return state;
    }
  }

export default users;