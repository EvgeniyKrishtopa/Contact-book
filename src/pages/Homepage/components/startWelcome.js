import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles.module.scss';
import MainPageImg from '../../../images/mainpage_bg.jpg';

const backgroundImage = {
  backgroundImage: `url(${MainPageImg})`,
};

const StartWelcome = () => {
  return (
    <div className={`${styles.home} page-center`} style={backgroundImage}>
      <div className={styles.introHolder}>
        <h1>Create your contacts with YCB!!!</h1>
        <p>
          Welcome to <strong>Your Contact Book</strong>! You can create a lot of
          necessary contacts and manage them here.
        </p>
        <Link to="/register" className="btn btn-primary">
          Get Started!
        </Link>
      </div>
    </div>
  );
};

export default StartWelcome;
