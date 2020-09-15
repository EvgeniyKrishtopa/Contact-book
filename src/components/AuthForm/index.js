import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './input';

const Form = ({
  isLogin,
  handleSubmit,
  setLogin,
  setEmail,
  setPassword,
  submitText,
  login,
  email,
  password,
}) => {
  return (
    <form className="form-styles" onSubmit={handleSubmit}>
      {!isLogin && (
        <div className="input-holder">
          <label className="form-label">
            Your Login
            <Field
              type="text"
              name="login"
              className="form-control"
              placeholder="Login"
              value={login}
              setLogin={setLogin}
              component={Input}
              required
            />
          </label>
        </div>
      )}
      <div className="input-holder">
        <label className="form-label">
          Your Email
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={email}
            setEmail={setEmail}
            component={Input}
            required
          />
        </label>
      </div>
      <div className="input-holder">
        <label className="form-label">
          Your Password
          <Field
            type="password"
            name="password"
            className="form-control"
            placeholder="password"
            value={password}
            setPassword={setPassword}
            component={Input}
            required
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        {submitText}
      </button>
    </form>
  );
};

const AuthForm = reduxForm({
  form: 'Authform',
})(Form);

export default AuthForm;
