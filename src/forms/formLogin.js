import React from 'react';
import {Field, reduxForm} from 'redux-form';
import form from './form.module.scss';

let FormLogin = ({ handleSubmit }) => {
  return(
    <form className={form.formWrapper} onSubmit={handleSubmit}>
      <Field className={form.formInput} name="email" component="input" type="email" placeholder="email"/>
      <Field className={form.formInput} name="password"component="input" type="password" placeholder="password"/>
      <br/>
      <button type="submit"  className={form.btnSubmit}>LogIn</button>
    </form>
  )
}

FormLogin = reduxForm ({
  form: 'login',
}) (FormLogin);

export default FormLogin;