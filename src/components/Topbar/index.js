import React from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';
import { NavLink, Link } from 'react-router-dom';

const isAuth = true;

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
              {!isAuth && (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={styles.underlineClosing}
                      activeClassName={styles.active}
                    >
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={styles.underlineClosing}
                      activeClassName={styles.active}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}

              {isAuth && (
                <li>
                  <Link to="/" className={styles.underlineClosing}>
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
