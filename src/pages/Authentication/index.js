import React, { useState } from 'react';
import firebase from '../../firebase/firebase';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogIn, SignUp } from '../../store/actions';

const Authentication = ({ match }) => {
  const dispatch = useDispatch();
  const auth = firebase.auth();
  const isLogin = match.path === '/login';
  const pageTitle = isLogin ? 'Log In' : 'Sign Up';
  const submitText = isLogin ? 'Login' : 'Register';
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();

    if (isLogin) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          dispatch(LogIn(user));
          setUser(user);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (!isLogin) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) => {
          if (user) {
            user.updateProfile({ displayName: login });
            setUser(user);
            dispatch(SignUp(user));
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      setLogin('');
    }

    setEmail('');
    setPassword('');
  };

  if (user) {
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
