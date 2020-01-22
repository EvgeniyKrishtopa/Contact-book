import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/actionCreator';

import './auth.css';

class Login extends Component {
  
  handleLogIn = event => {
    event.preventDefault();
    const { email,password } = event.target.elements;
    this.props.loginUser(email, password);
    this.props.history.push('/');
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
      </div>
    )
  }
}

export default connect(
  null,
  { loginUser }
)(Login);  



