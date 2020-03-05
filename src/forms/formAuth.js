import React from 'react';

const FormAuth = ({onSubmit}) => {
  return (
      <form className="contact-input-wrapper" onSubmit={onSubmit}>   
        <input className="contact-input" name="email" type="email" placeholder="email"/>
        <input className="contact-input" name="password" type="password" placeholder="password"/>
        <br/>
        <button type="submit" className="btn-submit">SignUp</button>
    </form>
  )
}

export default FormAuth;