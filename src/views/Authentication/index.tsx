import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CurrentUserContext } from 'context';
import { useAppDispatch } from 'store/hooks';
import { LogIn, SignUp } from 'store/actions/Users/actions';
import AuthForm from 'components/AuthForm';
import { IError } from 'typings/interfaces';

export interface IUserAuthData {
  userEmail: string;
  userPassword: string;
  userLogin: string;
}

type Props = {
  isLogin: boolean;
};

const Authentication: React.FC<Props> = ({ isLogin }) => {
  const { userData, error } = useContext(CurrentUserContext);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pageTitle = isLogin ? 'Log In' : 'Sign Up';
  const buttonText = isLogin ? 'Login' : 'Register';

  const [currentUserData, setCurrentUserData] = useState<any | null>(null);
  const [errorNotification, setErrorNotification] = useState<IError | null>(
    null,
  );

  useEffect(() => {
    setCurrentUserData(userData);
  }, [userData]);

  useEffect(() => {
    setErrorNotification(error);
  }, [error]);

  useEffect(() => {
    if (currentUserData) {
      router.replace('/home');
    }
  }, [currentUserData, router]);

  const formSubmit = ({
    userEmail,
    userPassword,
    userLogin,
  }: IUserAuthData) => {
    if (isLogin) {
      dispatch(LogIn({ userEmail, userPassword }));
    }
    if (!isLogin) {
      dispatch(SignUp({ userEmail, userPassword, userLogin }));
    }
  };

  return (
    <div className="page-center">
      <div className="container">
        <h2 className="center">{pageTitle}</h2>
        <AuthForm
          onSubmit={formSubmit}
          isLogin={isLogin}
          buttonText={buttonText}
        />
        {errorNotification && (
          <p className="text-center text-[1.2rem] uppercase text-red">
            {errorNotification.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Authentication;
