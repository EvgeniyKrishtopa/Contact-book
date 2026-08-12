import { auth } from 'store/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'store/reducers';
import { UserActionTypes } from './types';
import { IError } from 'typings/interfaces';

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

type ThunkType = ThunkAction<void, RootState, unknown, UserActionTypes>;

const logInStarted = (): UserActionTypes => {
  return {
    type: LOG_IN_STARTED,
    loading: true,
  };
};

const logInSuccess = (user: any | null): UserActionTypes => {
  return {
    type: LOG_IN_SUCCESS,
    userData: user,
    loading: false,
    error: null,
    isLoginnedUser: true,
  };
};

const logInEroor = (error: IError): UserActionTypes => {
  return {
    type: LOG_IN_ERROR,
    error,
  };
};

export const LogIn = (userEmail: string, userPassword: string): ThunkType => {
  return dispatch => {
    dispatch(logInStarted());
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(({ user }) => {
        dispatch(logInSuccess(user));
      })
      .catch(error => {
        dispatch(logInEroor(error));
      });
  };
};

const signUpStarted = (): UserActionTypes => {
  return {
    type: SIGN_UP_STARTED,
    loading: true,
  };
};

const signUpSuccess = (user: any | null): UserActionTypes => {
  return {
    type: SIGN_UP_SUCCESS,
    userData: user,
    loading: false,
    error: null,
    isLoginnedUser: true,
  };
};

const signUpError = (error: IError): UserActionTypes => {
  return {
    type: SIGN_UP_ERROR,
    error,
  };
};

export const SignUp = (
  userEmail: string,
  userPassword: string,
  userLogin: string,
): ThunkType => {
  return dispatch => {
    dispatch(signUpStarted());
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(({ user }) => {
        if (user) {
          updateProfile(user, { displayName: userLogin }).then(() =>
            dispatch(signUpSuccess(user)),
          );
        }
      })

      .catch(error => {
        dispatch(signUpError(error));
      });
  };
};

const logOutStarted = (): UserActionTypes => {
  return {
    type: SIGN_OUT_STARTED,
    loading: true,
  };
};

const logOutSuccess = (): UserActionTypes => {
  return {
    type: SIGN_OUT_SUCCESS,
    userData: null,
    loading: false,
    error: null,
    isLoginnedUser: false,
  };
};

const logOutError = (error: IError): UserActionTypes => {
  return {
    type: SIGN_OUT_ERROR,
    error,
  };
};

export const LogOut = (): ThunkType => {
  return dispatch => {
    dispatch(logOutStarted());
    signOut(auth)
      .then(() => {
        dispatch(logOutSuccess());
      })

      .catch(error => {
        dispatch(logOutError(error));
      });
  };
};

const isLoginStarted = (): UserActionTypes => {
  return {
    type: IS_LOG_IN_STARTED,
    loading: true,
  };
};

const isLoginSuccess = (user: any | null): UserActionTypes => {
  return {
    type: IS_LOG_IN_SUCCESS,
    userData: user,
    loading: false,
    error: null,
    isLoginnedUser: true,
  };
};

const isLoginError = (): UserActionTypes => {
  return {
    type: IS_LOG_IN_ERROR,
    isLoginnedUser: false,
  };
};

export const IsLogIn = (): ThunkType => {
  return dispatch => {
    dispatch(isLoginStarted());

    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(isLoginSuccess(user));
      } else {
        dispatch(isLoginError());
      }
    });
  };
};

export const changeAuthPage = (): UserActionTypes => {
  return {
    type: CHANGE_AUTH_PAGE,
    error: null,
  };
};
