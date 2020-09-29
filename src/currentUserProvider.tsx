import React, { useEffect } from 'react';
import { CurrentUserContext } from './context';
import { useDispatch, useSelector } from 'react-redux';
import { IsLogIn } from './store/actions/Users/actions';
import { getCurrentUser } from './selectors';
import { IUser } from './typings/interfaces';
import { RootState } from './store/reducers';

type Props = {
  children: React.ReactNode;
};

const CurrentUserProvider = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(IsLogIn());
  }, [dispatch]);

  const user = useSelector<RootState, IUser>(state => getCurrentUser(state));

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
