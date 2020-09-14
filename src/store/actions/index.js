import firebase from '../../firebase/firebase';
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
} from '../constants';

const auth = firebase.auth();

export const LogIn = (email, password) => {
  return dispatch => {
    dispatch(logInStarted());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(logInSuccess(user));
      })
      .catch(error => {
        dispatch(logInEroor(error));
      });
  };
};

const logInStarted = () => {
  return { type: LOG_IN_STARTED };
};

const logInSuccess = user => {
  return {
    userData: user,
    type: LOG_IN_SUCCESS,
  };
};

const logInEroor = error => {
  return { type: LOG_IN_ERROR, error };
};

export const SignUp = (login, email, password) => {
  return dispatch => {
    dispatch(signUpStarted());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          user
            .updateProfile({ displayName: login })
            .then(() => dispatch(signUpSuccess(user)));
        }
      })

      .catch(error => {
        dispatch(signUpError(error));
      });
  };
};

const signUpStarted = () => {
  return { type: SIGN_UP_STARTED };
};

const signUpSuccess = user => {
  return {
    userData: user,
    type: SIGN_UP_SUCCESS,
  };
};

const signUpError = error => {
  return {
    error,
    type: SIGN_UP_ERROR,
  };
};

export const LogOut = () => {
  return dispatch => {
    dispatch(logOutStarted());
    auth
      .signOut()
      .then(() => {
        dispatch(logOutSuccess());
      })
      .catch(error => {
        dispatch(logOutError(error));
      });
  };
};

const logOutStarted = () => {
  return { type: SIGN_OUT_STARTED };
};

const logOutSuccess = () => {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

const logOutError = error => {
  return {
    error,
    type: SIGN_OUT_ERROR,
  };
};

export const IsLogIn = () => {
  return dispatch => {
    dispatch(isLoginStarted());

    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(isLoginSuccess(user));
      } else {
        dispatch(isLoginError());
      }
    });
  };
};

const isLoginStarted = () => {
  return { type: IS_LOG_IN_STARTED };
};

const isLoginSuccess = user => {
  return {
    userData: user,
    type: IS_LOG_IN_SUCCESS,
  };
};

const isLoginError = () => {
  return {
    error: 'No user is signed in',
    type: IS_LOG_IN_ERROR,
  };
};
