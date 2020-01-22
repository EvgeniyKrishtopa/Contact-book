import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { signOutUser } from '../../actions/actionCreator';
import firebase from '../../firebase';
import './navbar.scss';

class Navbar extends Component {

  state = {
    user: ''
  }

  logOut = () => {
    this.props.signOutUser();
    
    this.setState({
      user: ''
    })  
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        
        this.setState({
          user
        })        
      }
    })
  }

  render() {
    return(
    <nav className="navbar">
      {
        this.state.user 
        ?<div className="container">
            <strong className="userName">{this.state.user.email}</strong>
            <button className="logOut" onClick={this.logOut}>
              <NavLink to="/login">LogOut</NavLink>
            </button>
          </div>
        :<div className="container">
          <ul className="nav-menu">
            <NavLink to="/login">LogIn</NavLink>
            <NavLink to="/signup">SignUp</NavLink>
          </ul>
        </div>
      }      
    </nav>
    )
  }
}

export default connect(
  null,
  { signOutUser }
)(Navbar);  