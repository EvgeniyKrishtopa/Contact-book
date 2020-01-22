import React, {Component} from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/actionCreator';
import './auth.css';

class Signup extends Component {

  handleSignUp = event => {
    event.preventDefault();

    const { email,password, name } = event.target.elements;
    this.props.createUser(email.value,password.value, name.value);
    this.props.history.push('/');
  }

    render () {
      return(
      <div className="contact-wrapper">
        <form className="contact-input-wrapper" onSubmit={this.handleSignUp}>
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
}

export default connect(
  null,
  { createUser }
)(Signup);  
