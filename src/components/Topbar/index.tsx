import React, { useContext, useState, useEffect } from 'react';
import { MdViewList } from 'react-icons/md';
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

  const underlineClosing =
    "font-bold text-black/80 relative pb-[5px] after:content-[''] after:absolute after:top-full after:left-0 after:h-[3px] after:w-0 after:bg-black/80 after:transition-[width] after:duration-200 after:ease-in-out before:content-[''] before:absolute before:top-full before:right-0 before:h-[3px] before:w-0 before:bg-black/80 before:transition-[width] before:duration-200 before:ease-in-out hover:after:w-1/2 hover:before:w-1/2";
  const active = 'text-fiolet after:bg-fiolet before:bg-fiolet';

  return (
    <div className="py-[5px] bg-blue/5 min-[767px]:py-[15px]">
      <div className="container">
        <div className="row">
          <strong className="max-w-[200px]">
            <Link href="/" className="flex items-center text-black">
              <MdViewList size={24} /> Y C B
            </Link>
          </strong>
          <nav>
            <ul className="flex flex-wrap items-center">
              {!currentUserData && (
                <>
                  <li className="px-[10px]">
                    <Link
                      href="/login"
                      className={`${underlineClosing} ${
                        pathname === '/login' ? active : ''
                      }`}
                      onClick={handleAuthPages}
                    >
                      Log In
                    </Link>
                  </li>
                  <li className="px-[10px]">
                    <Link
                      href="/register"
                      className={`${underlineClosing} ${
                        pathname === '/register' ? active : ''
                      }`}
                      onClick={handleAuthPages}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              {currentUserData && (
                <li className="px-[10px]">{currentUserData.displayName}</li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
