import React, { useContext, useState, useEffect } from 'react';
import MaterialIcon from 'material-icons-react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from 'context';
import { changeAuthPage } from 'store/actions/Users/actions';

const TopBar: React.FC = () => {
  const { userData } = useContext(CurrentUserContext);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const dispatch = useDispatch();

  const handleAuthPages = () => {
    dispatch(changeAuthPage());
  };

  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);

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
              {!currentUserData && (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={styles.underlineClosing}
                      activeClassName={styles.active}
                      onClick={handleAuthPages}
                    >
                      Log In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={styles.underlineClosing}
                      activeClassName={styles.active}
                      onClick={handleAuthPages}
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}

              {currentUserData && <li>{currentUserData.displayName}</li>}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
