import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { signOutUser } from '../../actions/actionCreator';
import './navbar.scss';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };
  }

  logOut = () => {
    this.props.signOutUser();
    
    this.setState({
      user: null
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        
        this.setState({
          user
        })   
      }

      else {
        this.setState({
          user: null
        })   
      }
    })

  }

  render() {
    return(
    <nav className="navbar">
      { this.state.user
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

const mapStateToProps = store => {
  return {
    user: store.users.user
  }
}

export default connect(
  mapStateToProps,
  { signOutUser }
)(Navbar);  