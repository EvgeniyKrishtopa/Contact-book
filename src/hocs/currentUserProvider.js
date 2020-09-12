import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../context';
import firebase from '../firebase/firebase';

export const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};
