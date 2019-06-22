import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import UploadFile from './pages/UploadFile';
import AlertDetails from './pages/AlertDetails';
import MyAlerts from './pages/MyAlerts';
import Administrative from './pages/Administrative';
import PrivateRoute from './components/Route/PrivateRoute'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} />
      <Route path="/user/login" exact component={UserLogin} />
      <Route path="/user/register" exact component={UserRegister} />
      <PrivateRoute path="/upload" component={UploadFile} />
      <PrivateRoute path="/history/alerts" exact component={AlertDetails} />
      <PrivateRoute path="/alerts" exact component={MyAlerts} />
      <PrivateRoute path="/user/administrative" exact component={Administrative} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
