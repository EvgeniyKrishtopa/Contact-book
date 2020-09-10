import React from 'react';
import StartWelcome from './components/startWelcome';
import styles from './styles.module.scss';
import MainPageImg from '../../images/mainpage_bg.jpg';

const isAuth = false;

const backgroundImage = {
  backgroundImage: `url(${MainPageImg})`,
};

const Loginned = () => {
  return <div>Hello</div>;
};

const Homepage = () => {
  return isAuth ? (
    <Loginned />
  ) : (
    <StartWelcome backgroundImage={backgroundImage} styles={styles} />
  );
};

export default Homepage;
