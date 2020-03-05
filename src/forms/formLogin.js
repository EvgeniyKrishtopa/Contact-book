import React from 'react';

const FormLogin = ({onSubmit}) => {
  return(
    <form className="contact-input-wrapper" onSubmit={onSubmit}>
      <input className="contact-input" name="email" type="email" placeholder="email"/>
      <input className="contact-input" name="password" type="password" placeholder="password"/>
      <br/>
      <button type="submit"  className="btn-submit">LogIn</button>
    </form>
  )
}

export default FormLogin;