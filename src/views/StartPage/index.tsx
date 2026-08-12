import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
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
    <div
      className="page-center relative bg-cover bg-center after:content-[''] after:absolute
        after:inset-0 after:h-full after:w-full after:bg-gray/67 after:z-[9]"
      style={backgroundImage}
    >
      <div
        className="p-[20px] text-center relative z-10 text-white min-[767px]:text-[22px]"
      >
        <h1 className="uppercase pb-[20px] text-black max-[767px]:text-[25px]">
          Create your contacts with YCB!
        </h1>
        <p className="pb-[20px]">
          Welcome to <strong className="text-yellow">Your Contact Book</strong>! You can create a lot of
          necessary contacts and manage them here!
        </p>
        {!isLoginnedUserState && (
          <>
            <Link href="/register" className="btn btn-primary m-[5px]">
              Need an Account?
            </Link>
            <Link href="/login" className="btn btn-primary m-[5px]">
              Have an Account?
            </Link>
          </>
        )}

        {isLoginnedUserState && (
          <Link className="btn btn-primary m-[5px]" href="/home">
            Go To Homepage
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartPage;
