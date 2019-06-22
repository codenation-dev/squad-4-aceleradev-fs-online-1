import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isLogged } from '../../services/loginService';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLogged() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/user/login', state: { from: props.location } }} />
    ))
            }
  />
);

export default PrivateRoute;
