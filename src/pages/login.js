import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import FormLogin from '../forms/formLogin';
import { connect } from 'react-redux';
import { loginUser } from '../actions/actionCreator';
import {getErrorLoginNotification, getCurrentUser} from '../selectors/index';

import login from './pages.module.scss';

class Login extends Component {
  
  handleLogIn = event => {
    event.preventDefault();
    const { email,password } = event.target.elements;
    this.props.loginUser(email, password);
  }

  render() {
    return(
      <div className={login.mainWrapper }>
        {
          this.props.user 
          ?<Redirect to = {"/"}/>
          :<div>
            <h1>Log In</h1>
            <FormLogin onSubmit={this.handleLogIn}/>
              {
                this.props.errorLogin && 
                <div className={login.notification}>
                    <p>{`${this.props.errorLogin}`}</p>
                </div>
              }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    user: getCurrentUser(store),
    errorLogin: getErrorLoginNotification(store)
  }
}

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);  



