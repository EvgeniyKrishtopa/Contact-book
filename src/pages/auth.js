import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import FormAuth from '../forms/formAuth';
import { connect } from 'react-redux';
import { createUser } from '../actions/actionCreator';
import { getCurrentUser,getErrorAuthNotification } from '../selectors/index';
import { validateEmail,validatePassword } from '../helpers/validation';
import auth from './pages.module.scss';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.warningRef = React.createRef();
  }

  handleSignUp = values => {
    const { email,password } = values;
    
    if(validateEmail(email) && validatePassword(password)) {
      this.props.createUser(email, password);
    }

    if(!validatePassword(password)) {
      this.warningRef.current.style.display = 'block';
    }
  }

    render () {
      return(
      <div className={auth.mainWrapper}>
        {/*TODO: тернарники в рендере плохо*/}
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
              <p className={auth.passwordWarning} ref={this.warningRef}>Your password must be between 6 and 30 characters.</p>
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
