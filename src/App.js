import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';

import Navbar from './containers/navbar/navbar';
import ContactBook from './containers/contacts/book';
import Login from './containers/auth/login';
import Signup from './containers/auth/signup';


const App = () => (
    <Router>
        <Navbar/>
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={ContactBook}/>
    </Router>
)

export default App;