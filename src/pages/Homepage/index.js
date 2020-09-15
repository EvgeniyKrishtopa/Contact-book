import React, { useContext } from 'react';
import IsLogginedUserPage from './isLoggedUser';
import { CurrentUserContext } from '../../context';
import Loader from '../../components/Loader';

const Homepage = props => {
  const { userData, isLoginnedUser } = useContext(CurrentUserContext);

  return isLoginnedUser ? (
    <IsLogginedUserPage
      user={userData}
      history={props.history}
      isLoginnedUser={isLoginnedUser}
    />
  ) : (
    <Loader />
  );
};

export default Homepage;
