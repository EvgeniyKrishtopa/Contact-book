import React from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';
import { NavLink } from "react-router-dom";

const TopBar = () => {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className="row">
          <strong className={styles.logo}>
            <NavLink to="/">
              <MaterialIcon icon="view_list" size="large" /> Y C B
            </NavLink>
          </strong>
          <nav className={styles.nav}>
            <ul>
              <li>
                <NavLink to="/login" className={styles.underlineClosing}>
                  Log In
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={styles.underlineClosing}>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
