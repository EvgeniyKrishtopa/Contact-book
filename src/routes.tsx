import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from './components/Loader';
const Authentication = lazy(() => import('./pages/Authentication'));
const HomePage = lazy(() => import('./pages/Homepage'));
const StartPage = lazy(() => import('./pages/StartPage'));

export default () => {
  return (
    <Suspense fallback={Loader()}>
      <Switch>
        <Route path="/" component={StartPage} exact />
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={Authentication} />
        <Route path="/register" component={Authentication} />
      </Switch>
    </Suspense>
  );
};
