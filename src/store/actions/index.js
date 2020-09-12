import { LOG_IN, SIGN_UP, SIGN_OUT } from '../constants';

export const LogIn = user => ({
  type: LOG_IN,
  user,
});

export const SignUp = user => ({
  type: SIGN_UP,
  user,
});

export const LogOut = () => ({
  type: SIGN_OUT,
});
