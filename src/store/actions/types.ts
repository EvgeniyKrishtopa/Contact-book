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

import { IError } from '../../typings/interfaces';

interface ILogInStarted {
  type: typeof LOG_IN_STARTED;
  loading: boolean;
}

interface ILogInSuccess {
  type: typeof LOG_IN_SUCCESS;
  userData: any | null;
  loading: boolean;
  error: null;
  isLoginnedUser: boolean;
}

interface ILogInError {
  type: typeof LOG_IN_ERROR;
  error: IError;
}

interface ISignUpStarted {
  type: typeof SIGN_UP_STARTED;
  loading: boolean;
}

interface ISignUpSuccess {
  type: typeof SIGN_UP_SUCCESS;
  userData: any | null;
  loading: boolean;
  error: null;
  isLoginnedUser: boolean;
}

interface ISignUpError {
  type: typeof SIGN_UP_ERROR;
  error: IError;
}

interface ISignOutStarted {
  type: typeof SIGN_OUT_STARTED;
  loading: boolean;
}

interface ISignOutSuccess {
  type: typeof SIGN_OUT_SUCCESS;
  userData: null;
  loading: boolean;
  error: null;
  isLoginnedUser: boolean;
}

interface ISignOutError {
  type: typeof SIGN_OUT_ERROR;
  error: IError;
}

interface IIsLoginStarted {
  type: typeof IS_LOG_IN_STARTED;
  loading: boolean;
}

interface IIsLoginSuccess {
  type: typeof IS_LOG_IN_SUCCESS;
  userData: any | null;
  loading: boolean;
  error: null;
  isLoginnedUser: boolean;
}

interface IIsLoginError {
  type: typeof IS_LOG_IN_ERROR;
  error: string;
}

interface IChangeAuthPage {
  type: typeof CHANGE_AUTH_PAGE;
  error: null;
}

export type UserActionTypes =
  | ILogInStarted
  | ILogInSuccess
  | ILogInError
  | ISignUpStarted
  | ISignUpSuccess
  | ISignUpError
  | ISignOutStarted
  | ISignOutSuccess
  | ISignOutError
  | IIsLoginStarted
  | IIsLoginSuccess
  | IIsLoginError
  | IChangeAuthPage;
