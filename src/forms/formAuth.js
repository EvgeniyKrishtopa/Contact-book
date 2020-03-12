import React from 'react';
import {Field, reduxForm} from 'redux-form';
import form from './form.module.scss';

let FormAuth = ({ handleSubmit }) => {
    //TODO: в целом подход можно поменять. Сделай одну форму которая будет принимать конфиги полей для авторизации и регистрации
    // Далее в компонент формы скармливай нужный конфиг по какому-нить параметру типа type: 'auth' | 'signIn'
    // По этому ключу подключай нужный конфиг полей и парси их в нужные тебе филды
  return (
      <form className={form.formWrapper} onSubmit={handleSubmit}>   
        <Field className={form.formInput} name="email" component="input" type="email" placeholder="email"/>
        <Field className={form.formInput} name="password"component="input" type="password" placeholder="password"/>
        <br/>
        <button type="submit" className={form.btnSubmit}>SignUp</button>
    </form>
  )
}

FormAuth = reduxForm ({
  form: 'Auth',
}) (FormAuth);

export default FormAuth;