import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import New from './components/New';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/new" component={New} />
    </Switch>
  </BrowserRouter>
);
