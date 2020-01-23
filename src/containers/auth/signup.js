import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/actionCreator';
import './auth.scss';

function validateEmail(email) {
  const re = /^(([^<>()\t[\]\\.,;:\s@"]+(\.[^<>()\t[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Signup extends Component {

  handleSignUp = event => {
    event.preventDefault();

    const { email,password } = event.target.elements;
    
    if(validateEmail(email.value)) {
      this.props.createUser(email.value,password.value);
      this.props.history.push('/');
    }
  }

    render () {
      return(
      <div className="contact-wrapper">
        <form className="contact-input-wrapper" onSubmit={this.handleSignUp}>
          <h1>Sign Up</h1>
          <input className="contact-input" name="email" type="email" placeholder="email"/>
          <input className="contact-input" name="password" type="password" placeholder="password"/>
          <br/>
          <button type="submit" className="btn-submit">SignUp</button>
        </form>
      </div>
      )
    }
}

export default connect(
  null,
  { createUser }
)(Signup);  
