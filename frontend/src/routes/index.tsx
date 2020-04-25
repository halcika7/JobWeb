import React, { FC } from 'react';

// navigation
import { Switch } from 'react-router-dom';

// lazy load component
import lazy from '@lazy';

// route component
import PublicRoute from './PublicRoute';

// components
const LoginPage = lazy('pages/Auth/Login');
const RegisterPage = lazy('pages/Auth/Register');
const NotFound = lazy('pages/404');

const Routes: FC = (): JSX.Element => (
  <>
    <Switch>
      <PublicRoute
        restricted
        component={LoginPage}
        exact
        path="/login"
        redirectTo="/"
      />
      <PublicRoute restricted component={RegisterPage} exact path="/register" />
      <PublicRoute component={NotFound} />
    </Switch>
  </>
);

export default React.memo(Routes);
