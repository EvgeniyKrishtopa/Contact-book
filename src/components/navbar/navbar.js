import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/actionCreator';
import navBar from'./navbar.module.scss';

class Navbar extends Component {

  state = {
    user: null
  }

  componentDidMount(){
    const data = JSON.parse(localStorage.getItem('user'));

    if(data !== null) {
      this.setState({
        user: data
      })
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.user !== prevProps.user) {
      localStorage.setItem('user', JSON.stringify(this.props.user))
      
      this.setState({
        user: this.props.user
      })
    }
  }

  logOut = () => {
    this.props.signOutUser();

    this.setState({
      user: null
    })

    localStorage.setItem('user', null)
  }
  
  render() {
    return(
    <nav className={navBar.navbar}>
      { this.state.user
        ?<div className={navBar.container}>
            <strong className={navBar.userName}>{this.state.user.email}</strong>
            <button className={navBar.logOut} onClick={this.logOut}>
              <NavLink to="/login">LogOut</NavLink>
            </button>
          </div>
        :<div className={navBar.container}>
          <strong>Hello! Register or Log-in, please!</strong>
          <ul className={navBar.navMenu}>
            <NavLink to="/login">LogIn</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </ul>
        </div>
      }      
    </nav>
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
  { signOutUser }
)(Navbar);  