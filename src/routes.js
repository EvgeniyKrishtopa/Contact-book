import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import Homepage from './pages/Homepage';

export default () => {
  return (
    <Switch>
      <Route path="/" component={Homepage} exact />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  );
};
