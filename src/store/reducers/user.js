import { LOG_IN, SIGN_UP, SIGN_OUT } from '../constants';

const USERSTATE = null;

const user = (state = USERSTATE, { type, user }) => {
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        state: user,
      };

    case SIGN_UP:
      return {
        ...state,
        state: user,
      };

    case SIGN_OUT:
      return null;

    default:
      return state;
  }
};

export default user;
