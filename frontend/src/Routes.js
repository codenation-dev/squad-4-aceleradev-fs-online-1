import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/user/login" exact component={UserLogin} />
      <Route path="/user/register" component={UserRegister} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
