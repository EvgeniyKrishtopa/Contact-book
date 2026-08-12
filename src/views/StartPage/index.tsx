import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { CurrentUserContext } from 'context';
import MainPageImg from 'images/mainpage_bg.jpg';

const backgroundImage = {
  backgroundImage: `url(${MainPageImg})`,
};

const StartPage: React.FC = () => {
  const [isLoginnedUserState, setIsLoginnedUserState] = useState<boolean>(
    false,
  );
  const { isLoginnedUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setIsLoginnedUserState(isLoginnedUser);
  }, [isLoginnedUser]);

  return (
    <div className={`${styles.startPage} page-center`} style={backgroundImage}>
      <div className={styles.introHolder}>
        <h1>Create your contacts with YCB!</h1>
        <p>
          Welcome to <strong>Your Contact Book</strong>! You can create a lot of
          necessary contacts and manage them here!
        </p>
        {!isLoginnedUserState && (
          <>
            <Link href="/register" className="btn btn-primary">
              Need an Account?
            </Link>
            <Link href="/login" className="btn btn-primary">
              Have an Account?
            </Link>
          </>
        )}

        {isLoginnedUserState && (
          <Link className="btn btn-primary" href="/home">
            Go To Homepage
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartPage;
