import {
  LOG_IN_STARTED,
  LOG_IN_ERROR,
  LOG_IN_SUCCESS,
  IS_LOG_IN_STARTED,
  IS_LOG_IN_ERROR,
  IS_LOG_IN_SUCCESS,
  SIGN_UP_STARTED,
  SIGN_UP_ERROR,
  SIGN_UP_SUCCESS,
  SIGN_OUT_STARTED,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  CHANGE_AUTH_PAGE,
} from '../constants';

const USERSTATE = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

const user = (state = USERSTATE, { type, userData, error }) => {
  switch (type) {
    case LOG_IN_STARTED:
      return {
        ...state,
        loading: true,
      };

    case LOG_IN_SUCCESS:
      return {
        ...state,
        userData,
        loading: false,
        error: null,
        isLoginnedUser: true,
      };

    case LOG_IN_ERROR:
      return {
        ...state,
        error: error,
      };

    case SIGN_UP_STARTED:
      return {
        ...state,
        loading: true,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userData,
        loading: false,
        error: null,
        isLoginnedUser: true,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        error: error,
      };

    case SIGN_OUT_STARTED:
      return {
        ...state,
        loading: true,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        userData: null,
        loading: false,
        error: null,
        isLoginnedUser: false,
      };

    case SIGN_OUT_ERROR:
      return {
        ...state,
        error: error,
      };

    case IS_LOG_IN_STARTED:
      return {
        ...state,
        loading: true,
      };

    case IS_LOG_IN_SUCCESS:
      return {
        ...state,
        userData,
        loading: false,
        error: null,
        isLoginnedUser: true,
      };

    case IS_LOG_IN_ERROR: {
      return {
        ...state,
        error: error,
      };
    }

    case CHANGE_AUTH_PAGE: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default user;
