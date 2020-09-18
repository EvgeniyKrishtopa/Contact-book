import React, { useContext } from 'react';
import IsLogginedUserPage from './isLoggedUser';
import { CurrentUserContext } from '../../context';
import Loader from '../../components/Loader';
import { User } from '../../typings/interfaces';

const Homepage: React.FC = props => {
  const { userData, isLoginnedUser } = useContext<User>(CurrentUserContext);

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
