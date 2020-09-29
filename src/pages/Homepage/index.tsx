import React, { lazy, useContext } from 'react';
import { CurrentUserContext } from 'context';
import Loader from 'components/Loader';
const IsLogginedUserPage = lazy(() => import('./isLoggedUser'));

const Homepage: React.FC = () => {
  const { userData, isLoginnedUser } = useContext(CurrentUserContext);

  return isLoginnedUser && userData ? (
    <IsLogginedUserPage user={userData} />
  ) : (
    <Loader />
  );
};

export default Homepage;
