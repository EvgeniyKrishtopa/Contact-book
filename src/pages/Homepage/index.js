import React from 'react';
import StartWelcome from './welcomeUser';
import IsLogginedUserPage from './isLoggedUser';
import { connect } from 'react-redux';
import { LogOut } from '../../store/actions';

const Homepage = props => {
  const { user, LogOut } = props;
  return user ? (
    <IsLogginedUserPage user={user} LogOut={LogOut} />
  ) : (
    <StartWelcome />
  );
};

export default connect(
  state => ({
    user: state.user,
  }),
  { LogOut },
)(Homepage);
