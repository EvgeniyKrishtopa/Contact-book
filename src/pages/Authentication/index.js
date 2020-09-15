import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../../context';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, SignUp } from '../../store/actions/userActions';
import AuthForm from '../../components/AuthForm';

const Authentication = ({ match }) => {
  const { userData } = useContext(CurrentUserContext);
  const dispatch = useDispatch();
  const isLogin = match.path === '/login';
  const pageTitle = isLogin ? 'Log In' : 'Sign Up';
  const submitText = isLogin ? 'Login' : 'Register';
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (isLogin) {
      dispatch(LogIn(email, password));
    }

    if (!isLogin) {
      dispatch(SignUp(login, email, password));
      setLogin('');
    }

    setEmail('');
    setPassword('');
  };

  if (userData) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="page-center">
      <div className="container">
        <h2 className="center">{pageTitle}</h2>
        <AuthForm
          isLogin={isLogin}
          login={login}
          email={email}
          password={password}
          submitText={submitText}
          setLogin={setLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Authentication;
