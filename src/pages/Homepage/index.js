import React from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';

const Homepage = () => {
  return (
    <div className={styles.home}>
      <div className={styles.introHolder}>
        <h1>Create your contacts with YCB!!!</h1>
        <p>
          Welcome to Your <strong>Contact Book Application</strong>! You can
          create a lot of necessary contacts and manage they here.
        </p>
        <a href="" className="btn btn-primary">
          Get Started!
        </a>
      </div>
    </div>
  );
};

export default Homepage;
