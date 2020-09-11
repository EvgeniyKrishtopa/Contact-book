import React from 'react';
import StartWelcome from './components/startWelcome';
import IsLogginedUserPage from './components/IsLoggedUserPage';

const isAuth = false;

const Homepage = () => {
  return isAuth ? <IsLogginedUserPage /> : <StartWelcome />;
};

export default Homepage;
