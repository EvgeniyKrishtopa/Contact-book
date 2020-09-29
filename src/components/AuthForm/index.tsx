import React from 'react';
import { Field, reduxForm, InjectedFormProps, reset } from 'redux-form';
import Input from '../Input';
import { IUserAuthData } from 'pages/Authentication';
import { validate } from 'utils';

interface IProps {
  isLogin: boolean;
  buttonText: string;
}

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
  onSubmitSuccess: (_result, dispatch, _props) => dispatch(reset('Authform')),
  validate,
})(AuthForm);
