import React, { useState, useContext } from 'react';
import { CurrentUserContext } from '../../context';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, SignUp } from '../../store/actions';

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
        <form className="form-styles" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-holder">
              <label className="form-label">
                Your Login
                <input
                  type="text"
                  className="form-control"
                  placeholder="Login"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                />
              </label>
            </div>
          )}
          <div className="input-holder">
            <label className="form-label">
              Your Email
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="input-holder">
            <label className="form-label">
              Your Password
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
