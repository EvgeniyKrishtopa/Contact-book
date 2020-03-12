import React from 'react';
import form from './form.module.scss';
import {Field, reduxForm} from 'redux-form';

let FormContacts = React.memo(({isDisabled, ref,  ...props}) => {
  return(
    <form className={form.formWrapper} onSubmit={props.handleSubmit} ref={props.ref}>
      <Field
        className={form.formInput}
        placeholder="Name"
        type="text"
        component="input"
        name="name"
      />
      <Field
        className={form.formInput}
        placeholder="Phone"
        type="tel"
        component="input" 
        name="phone"
      />
      <Field
        className={form.formInput}
        placeholder="Email"
        type="email"
        component="input"
        name="email"  
      />
      <br/>
      <button type="submit" disabled={isDisabled} className={form.btnSubmit}>Add New Contact</button>
      <br/>
    </form>
  )
})


FormContacts = reduxForm ({
  form: 'ContactForm',
}) (FormContacts);

export default FormContacts;