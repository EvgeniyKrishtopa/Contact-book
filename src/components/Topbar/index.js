import React from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';

const TopBar = () => {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className="row">
          <strong className={styles.logo}>
            <a href="/">
              <MaterialIcon icon="view_list" size="large" /> Y C B
            </a>
          </strong>
          <nav className={styles.nav}>
            <ul>
              <li>
                <a href="#">Log In</a>
              </li>
              <li>
                <a href="#">Sign Up</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
