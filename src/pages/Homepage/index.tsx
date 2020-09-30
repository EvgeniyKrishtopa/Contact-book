import React, { lazy, useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from 'context';
const IsLogginedUserPage = lazy(() => import('./isLoggedUser'));
const Loader = lazy(() => import('components/Loader'));

const Homepage: React.FC = () => {
  const { userData, isLoginnedUser } = useContext(CurrentUserContext);
  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const [isLoginnedUserStatus, setIsLoginnedUserStatus] = useState<boolean>(
    false,
  );

  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);

  useEffect(() => {
    setIsLoginnedUserStatus(isLoginnedUser);
  }, [isLoginnedUser]);

  return isLoginnedUserStatus && currentUserData ? (
    <IsLogginedUserPage user={currentUserData} />
  ) : (
    <Loader />
  );
};

export default Homepage;
