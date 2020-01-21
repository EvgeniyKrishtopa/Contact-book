import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import ContactBook from './containers/contacts/book';
import Login from './containers/auth/login';
import Signup from './containers/auth/signup';
import AuthStatus from './components/hoc/auth';


const App = () => (
  <AuthStatus>
    <Router>
      <Fragment>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={ContactBook}/>
      </Fragment>
    </Router>
  </AuthStatus>
)

export default App;