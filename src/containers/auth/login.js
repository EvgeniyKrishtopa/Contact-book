import React, {Component} from 'react';
import { connect } from 'react-redux';
import ButtonWrapper from '../../components/hoc/buttonWrapper';
import { loginUser } from '../../actions/actionCreator';

import './auth.scss';

class Login extends Component {
  
  handleLogIn = event => {
    event.preventDefault();
    const history = this.props.history;
    const { email,password } = event.target.elements;
    this.props.loginUser(email, password, history);
  }

  render() {
    return(
      <div className="contact-wrapper">
        <h1>Log In</h1>
        <form className="contact-input-wrapper" onSubmit={this.handleLogIn}>
          <input className="contact-input" name="email" type="email" placeholder="email"/>
          <input className="contact-input" name="password" type="password" placeholder="password"/>
          <br/>
          <ButtonWrapper type="submit"  className="btn-submit">LogIn</ButtonWrapper>
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



