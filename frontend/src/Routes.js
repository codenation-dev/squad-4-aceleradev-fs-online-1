import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/login" exact component={UserLogin} />
      <Route path="/user/register" component={UserRegister} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
