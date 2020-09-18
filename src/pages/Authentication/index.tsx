import React, { useContext } from 'react';
import { CurrentUserContext } from '../../context';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, SignUp } from '../../store/actions/userActions';
import AuthForm from '../../components/AuthForm';
import styles from './styles.module.scss';

const Authentication: React.FC = ({ match }) => {
  const { userData, error } = useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const isLogin = match.path === '/login';
  const pageTitle = isLogin ? 'Log In' : 'Sign Up';
  const buttonText = isLogin ? 'Login' : 'Register';

  const formSubmit = ({ userEmail, userPassword, userLogin }) => {
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
