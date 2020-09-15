import React, { useEffect } from 'react';
import { CurrentUserContext } from '../context';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogIn } from '../store/actions/userActions';
import { getCurrentUser } from '../selectors';

const CurrentUserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => getCurrentUser(state));

  useEffect(() => {
    dispatch(IsLogIn());
  }, [dispatch]);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
