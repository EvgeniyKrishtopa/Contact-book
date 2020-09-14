import React, { useContext } from 'react';
import IsLogginedUserPage from './isLoggedUser';
import { CurrentUserContext } from '../../context';
import Loader from '../../components/Loader';

const Homepage = () => {
  const user = useContext(CurrentUserContext);

  return user ? <IsLogginedUserPage user={user} /> : <Loader />;
};

export default Homepage;
