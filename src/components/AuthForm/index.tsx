import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './input';

const validate = values => {
  const errors = {};
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

const AuthForm: React.FC = ({ isLogin, buttonText, ...props }) => {
  const { handleSubmit, submitting, pristine } = props;
  console.log(submitting);

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

export default reduxForm({
  form: 'Authform',
  validate,
})(AuthForm);
