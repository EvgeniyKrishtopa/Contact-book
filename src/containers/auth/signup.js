import React from 'react';
import firebase from '../../firebase';
import './auth.css';

const Signup = ({ history }) => {

  const handleSignUp = event => {
    event.preventDefault();
    const { email,password, name } = event.target.elements;
    
    firebase.auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then(
              response => {
                return firebase.firestore().collection('users').doc(response.user.uid).set({
                  userName: name.value
                });
              }
            )
            .then( email.value = '', password.value = '')
            .then(setTimeout(() => history.push('/'), 1000))
  }

    return(
      <div className="contact-wrapper">
        <form className="contact-input-wrapper" onSubmit={handleSignUp}>
          <h1>Sign Up</h1>
          <input className="contact-input" name="name" type="text" placeholder="name"/> 
          <input className="contact-input" name="email" type="email" placeholder="email"/>
          <input className="contact-input" name="password" type="password" placeholder="password"/>
          <br/>
          <button type="submit" className="btn-submit">SignUp</button>
        </form>
      </div>
    )
}

export default Signup;
