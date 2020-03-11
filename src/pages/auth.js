import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import FormAuth from '../forms/formAuth';
import { connect } from 'react-redux';
import { createUser } from '../actions/actionCreator';
import { getCurrentUser,getErrorAuthNotification } from '../selectors/index';
import { validateEmail } from '../helpers/validation';
import auth from './pages.module.scss';

class Signup extends Component {

  handleSignUp = values => {
    const { email,password } = values;
    
    if(validateEmail(email)) {
      this.props.createUser(email, password);
    }
  }

    render () {
      return(
      <div className={auth.mainWrapper}>
        {
          this.props.user
          ?<Redirect to={"/"}/>
          :<div>
            <h1>Sign Up</h1>
            <FormAuth onSubmit={this.handleSignUp}/>
            {
              this.props.errorAuth && 
                <div className={auth.notification}>
                    <p>{`${this.props.errorAuth}`}</p>
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
    errorAuth: getErrorAuthNotification(store)
  }
}

export default connect(
  mapStateToProps,
  {createUser}
)(Signup);  
