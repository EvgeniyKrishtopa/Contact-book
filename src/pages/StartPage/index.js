import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import MainPageImg from '../../images/mainpage_bg.jpg';

const backgroundImage = {
  backgroundImage: `url(${MainPageImg})`,
};

const StartPage = () => {
  return (
    <div className={`${styles.startPage} page-center`} style={backgroundImage}>
      <div className={styles.introHolder}>
        <h1>Create your contacts with YCB!</h1>
        <p>
          Welcome to <strong>Your Contact Book</strong>! You can create a lot of
          necessary contacts and manage them here.
        </p>
        <Link to="/register" className="btn btn-primary">
          Need an Account?
        </Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/login" className="btn btn-primary">
          Have an Account?
        </Link>
      </div>
    </div>
  );
};

export default StartPage;