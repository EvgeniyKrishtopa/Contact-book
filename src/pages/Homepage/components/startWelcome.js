import React from 'react';
import { Link } from 'react-router-dom';

const StartWelcome = ({ backgroundImage, styles }) => {
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
