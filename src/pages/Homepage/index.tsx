import React, { useContext } from 'react';
import IsLogginedUserPage from './isLoggedUser';
import { CurrentUserContext } from '../../context';
import Loader from '../../components/Loader';

const Homepage: React.FC = () => {
  const { userData, isLoginnedUser } = useContext(CurrentUserContext);

  return isLoginnedUser && userData ? (
    <IsLogginedUserPage user={userData} />
  ) : (
    <Loader />
  );
};

export default Homepage;
