import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Homepage from './pages/Homepage';
import StartPage from './pages/StartPage';

export default () => {
  return (
    <Switch>
      <Route path="/" component={StartPage} exact />
      <Route path="/home" component={Homepage} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  );
};
