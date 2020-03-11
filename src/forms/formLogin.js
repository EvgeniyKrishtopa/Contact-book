import React from 'react';
import {Field, reduxForm} from 'redux-form';
import form from './form.module.scss';

let FormLogin = ({onSubmit}) => {
  return(
    <form className={form.formWrapper} onSubmit={onSubmit}>
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