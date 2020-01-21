import React from 'react';
import firebase from '../../firebase';

import './auth.css';

const Login = ({ history }) => {

  const handleLogIn = event => {
    event.preventDefault();

    const { email,password } = event.target.elements;

    firebase.auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => history.push('/'), 1000)
            .catch(
              () => {
                const notification = document.querySelector('.notification');
                notification.classList.remove('hidden');
                email.value ='';
                password.value = '';
              }
            )
    //если такого юзера нет, появляется уведомление и кнопка регистрации
  }

    return( 
      <div className="contact-wrapper">
        <h1>Log in</h1>
        <form className="contact-input-wrapper" onSubmit={handleLogIn}>
          <input className="contact-input" name="email" type="email" placeholder="email"/>
          <input className="contact-input" name="password" type="password" placeholder="password"/>
          <br/>
          <button type="submit" className="btn-submit">LogIn</button>
        </form>
        <div className="notification hidden">
          <p>Your email or password incorrect! You can signup here</p>
        </div>
      </div>
    )
}

export default Login;

