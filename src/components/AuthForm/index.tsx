import React from 'react';
import { useForm } from 'react-hook-form';
import Input from 'components/Input';
import { IUserAuthData } from 'views/Authentication';
import { createValidationResolver } from 'utils';

interface IProps {
  isLogin: boolean;
  buttonText: string;
  onSubmit: (data: IUserAuthData) => void;
}

const AuthForm: React.FC<IProps> = ({ isLogin, buttonText, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IUserAuthData>({
    resolver: createValidationResolver<IUserAuthData>(),
  });

  const submitHandler = (data: IUserAuthData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form
      className="form-styles"
      noValidate
      onSubmit={handleSubmit(submitHandler)}
    >
      {!isLogin && (
        <div className="input-holder">
          <label className="form-label">
            Your Login
            <Input
              type="text"
              className="form-control"
              placeholder="Login"
              error={errors.userLogin}
              {...register('userLogin')}
            />
          </label>
        </div>
      )}
      <div className="input-holder">
        <label className="form-label">
          Your Email
          <Input
            type="email"
            className="form-control"
            placeholder="Email"
            error={errors.userEmail}
            {...register('userEmail')}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Your Password
          <Input
            type="password"
            className="form-control"
            placeholder="Password"
            error={errors.userPassword}
            {...register('userPassword')}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="btn btn-primary"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default React.memo(AuthForm);
