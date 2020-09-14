import React, { useContext } from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../context';

const TopBar = () => {
  const {userData} = useContext(CurrentUserContext);

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
              {!userData && (
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

              {userData && <li>{userData.displayName}</li>}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
