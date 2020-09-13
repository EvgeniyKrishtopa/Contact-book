import React, { useEffect } from 'react';
import { CurrentUserContext } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from '../store/actions';
import firebase from '../firebase/firebase';

const CurrentUserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(LogIn(user));
      }
    });
  }, [dispatch]);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
