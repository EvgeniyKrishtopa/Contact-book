import {LOGIN_USER, CREATE_USER, SIGNOUT_USER} from '../constants';

const USER = {
    user: {}
};

const users = (state=USER, { type, currentUserData, newUserData, isUserLogged}) => {
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

    default:
        return state;
    }
  }

export default users;