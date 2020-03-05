import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import FormAuth from '../forms/formAuth';
import { connect } from 'react-redux';
import { createUser } from '../actions/actionCreator';
import './styles/auth.scss';

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
    }
  }

    render () {
      return(
      <div className="contact-wrapper">
        {
          this.props.user
          ?<Redirect to={"/"}/>
          :<div>
            <h1>Sign Up</h1>
            <FormAuth onSubmit={this.handleSignUp}/>
          </div>
        }
      </div>
      )
    }
}

const mapStateToProps = store => {
  return {
    user: store.users.user
  }
}

export default connect(
  mapStateToProps,
  { createUser }
)(Signup);  
