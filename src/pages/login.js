import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import FormLogin from '../forms/formLogin';
import { connect } from 'react-redux';
import { loginUser } from '../actions/actionCreator';

import './styles/auth.scss';

class Login extends Component {
  
  handleLogIn = event => {
    event.preventDefault();
    const { email,password } = event.target.elements;
    this.props.loginUser(email, password);
  }

  render() {
    return(
      <div className="contact-wrapper">
        {
          this.props.user 
          ?<Redirect to = {"/"}/>
          :<div>
            <h1>Log In</h1>
            <FormLogin onSubmit={this.handleLogIn}/>
              {
                this.props.errorLogin
                ? <div className="notification center">
                    <p>{`${this.props.errorLogin} Or you may register your profile.`}</p>
                  </div>
                :null
              }
          </div>
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



