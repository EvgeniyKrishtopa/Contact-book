import React, { useContext } from 'react';
import { CurrentUserContext } from 'context';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, SignUp } from 'store/actions/Users/actions';
import AuthForm from 'components/AuthForm';
import styles from './styles.module.scss';
import { RouteComponentProps } from 'react-router-dom';

type RouteParams = {
  match?: string | undefined;
};

export interface IUserAuthData {
  userEmail: string;
  userPassword: string;
  userLogin: string;
}

const Authentication: React.FC<RouteComponentProps<RouteParams>> = ({
  match,
}) => {
  const { userData, error } = useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const isLogin = match.path === '/login';
  const pageTitle = isLogin ? 'Log In' : 'Sign Up';
  const buttonText = isLogin ? 'Login' : 'Register';

  const formSubmit = ({
    userEmail,
    userPassword,
    userLogin,
  }: IUserAuthData) => {
    if (isLogin) {
      dispatch(LogIn(userEmail, userPassword));
    }
    if (!isLogin) {
      dispatch(SignUp(userEmail, userPassword, userLogin));
    }
  };

  if (userData) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="page-center">
      <div className="container">
        <h2 className="center">{pageTitle}</h2>
        <AuthForm
          onSubmit={formSubmit}
          isLogin={isLogin}
          buttonText={buttonText}
        />
        {error && <p className={styles.notificationError}>{error.message}</p>}
      </div>
    </div>
  );
};

export default Authentication;
