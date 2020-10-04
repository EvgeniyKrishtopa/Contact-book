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
} from 'store/constants';
import { IUser } from 'typings/interfaces';
import { UserActionTypes } from 'store/actions/Users/types';

const USERSTATE: IUser = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

const user = (state = USERSTATE, action: UserActionTypes): IUser => {
  switch (action.type) {
    case LOG_IN_STARTED:
      return {
        ...state,
        loading: action.loading,
      };

    case LOG_IN_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        loading: action.loading,
        error: action.error,
        isLoginnedUser: action.isLoginnedUser,
      };

    case LOG_IN_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case SIGN_UP_STARTED:
      return {
        ...state,
        loading: action.loading,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        loading: action.loading,
        error: action.error,
        isLoginnedUser: action.isLoginnedUser,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case SIGN_OUT_STARTED:
      return {
        ...state,
        loading: action.loading,
      };

    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        loading: action.loading,
        error: action.error,
        isLoginnedUser: action.isLoginnedUser,
      };

    case SIGN_OUT_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case IS_LOG_IN_STARTED:
      return {
        ...state,
        loading: action.loading,
      };

    case IS_LOG_IN_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        loading: action.loading,
        error: action.error,
        isLoginnedUser: action.isLoginnedUser,
      };

    case IS_LOG_IN_ERROR: {
      return {
        ...state,
        isLoginnedUser: action.isLoginnedUser,
      };
    }

    case CHANGE_AUTH_PAGE: {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export default user;
