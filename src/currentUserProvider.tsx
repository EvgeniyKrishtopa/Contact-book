import React, { useEffect } from 'react';
import { CurrentUserContext } from 'context';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { IsLogIn } from 'store/actions/Users/actions';
import { getCurrentUser } from 'selectors';

type Props = {
  children: React.ReactNode;
};

const CurrentUserProvider = ({ children }: Props): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(IsLogIn());
  }, [dispatch]);

  const user = useAppSelector(getCurrentUser);

  return (
    <CurrentUserContext.Provider value={user}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserProvider;
