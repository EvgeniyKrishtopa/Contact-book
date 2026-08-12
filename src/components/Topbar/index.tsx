import React, { useContext, useState, useEffect } from 'react';
import { MdViewList } from 'react-icons/md';
import styles from './styles.module.scss';
import { useAppDispatch } from 'store/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CurrentUserContext } from 'context';
import { changeAuthPage } from 'store/actions/Users/actions';

const TopBar: React.FC = () => {
  const { userData } = useContext(CurrentUserContext);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

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
            <Link href="/">
              <MdViewList size={24} /> Y C B
            </Link>
          </strong>
          <nav className={styles.nav}>
            <ul>
              {!currentUserData && (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`${styles.underlineClosing} ${
                        pathname === '/login' ? styles.active : ''
                      }`}
                      onClick={handleAuthPages}
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className={`${styles.underlineClosing} ${
                        pathname === '/register' ? styles.active : ''
                      }`}
                      onClick={handleAuthPages}
                    >
                      Sign Up
                    </Link>
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
