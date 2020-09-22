import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Input from './input';
import { IUserAuthData } from '../../pages/Authentication';

interface IProps {
  isLogin: boolean;
  buttonText: string;
}

export interface IAuthFormErrors {
  userLogin?: string;
  userEmail?: string;
  userPassword?: string;
}

interface IAuthFromFieldValues {
  userLogin: string | null;
  userEmail: string | null;
  userPassword: string | null;
}

const validate = (values: IAuthFromFieldValues): IAuthFormErrors => {
  const errors: IAuthFormErrors = {};
  if (!values.userLogin) {
    errors.userLogin = 'This field is required!';
  } else if (values.userLogin.length > 15) {
    errors.userLogin = 'Must be 15 characters or less';
  }
  if (!values.userEmail) {
    errors.userEmail = 'This field is required!';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.userEmail)
  ) {
    errors.userEmail = 'Invalid email address!';
  }

  if (!values.userPassword) {
    errors.userPassword = 'This field is required!';
  } else if (values.userPassword.length < 6) {
    errors.userPassword = 'Must be 6 characters or more';
  }
  return errors;
};

const AuthForm: React.FC<InjectedFormProps<IUserAuthData, IProps> & IProps> = ({
  isLogin,
  buttonText,
  ...props
}) => {
  const { handleSubmit, submitting, pristine } = props;

  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      {!isLogin && (
        <div className="input-holder">
          <label className="form-label">
            Your Login
            <Field
              type="text"
              name="userLogin"
              className="form-control"
              placeholder="Login"
              component={Input}
            />
          </label>
        </div>
      )}
      <div className="input-holder">
        <label className="form-label">
          Your Email
          <Field
            type="email"
            name="userEmail"
            className="form-control"
            placeholder="Email"
            component={Input}
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Your Password
          <Field
            type="password"
            name="userPassword"
            className="form-control"
            placeholder="Password"
            component={Input}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={pristine || submitting}
        className="btn btn-primary"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default reduxForm<IUserAuthData, IProps>({
  form: 'Authform',
  validate,
})(AuthForm);
