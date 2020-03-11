import {LOGIN_USER, CREATE_USER, SIGNOUT_USER, LOGIN_USER_ERROR, CREATE_USER_ERROR} from '../actions/actionTypes';

const USER = {
    user: null,
    errorLoginNotification:'',
    errorAuthNotification: ''
};

const users = (state=USER, { type, currentUserData, newUserData, isUserLogged, errorInfo}) => {
  switch(type) {
    case LOGIN_USER :
      return {
        ...state, user: currentUserData, errorLoginNotification: ''
      }
    
    case CREATE_USER :
      return {
        ...state, user: newUserData, errorAuthNotification: ''
      }
    case SIGNOUT_USER :
      return {
        ...state, user: isUserLogged
      }
    case LOGIN_USER_ERROR : 
      return {
        ...state,errorLoginNotification: errorInfo
      }

    case CREATE_USER_ERROR :
      return {
        ...state,errorAuthNotification: errorInfo
      }

    default:
        return state;
    }
  }

export default users;