import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import UploadFile from './pages/UploadFile';
import AlertDetails from './pages/AlertDetails';
import MyAlerts from './pages/MyAlerts';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/user/login" exact component={UserLogin} />
      <Route path="/user/register" component={UserRegister} />
      <Route path="/upload" component={UploadFile} />
      <Route path="/history/alerts" exact component={AlertDetails} />
      <Route path="/alerts" exact component={MyAlerts} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
