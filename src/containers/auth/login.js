import React, {Component} from 'react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { loginUser } from '../../actions/actionCreator';

import './auth.scss';

class Login extends Component {
  
  handleLogIn = event => {
    event.preventDefault();
    const { email,password } = event.target.elements;
    this.props.loginUser(email, password);
  }

  componentDidUpdate() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) { 
        this.props.history.push('/');
      }
    })
  }

  render() {
    return(
      <div className="contact-wrapper">
        <h1>Log In</h1>
        <form className="contact-input-wrapper" onSubmit={this.handleLogIn}>
          <input className="contact-input" name="email" type="email" placeholder="email"/>
          <input className="contact-input" name="password" type="password" placeholder="password"/>
          <br/>
          <button type="submit" className="btn-submit">LogIn</button>
        </form>
        {
          this.props.errorLogin
          ? <div className="notification center">
              <p>{`${this.props.errorLogin} Or you may register your profile.`}</p>
            </div>
          :null
        }
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: store.users.user,
    errorLogin: store.users.errorNotification
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);  



