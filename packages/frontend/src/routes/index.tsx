import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

// lazy load component
import lazy from '@lazy';

// route component
import PublicRoute from './PublicRoute';

const LoginPage = lazy('pages/Auth/Login');
const RegisterPage = lazy('pages/Auth/Register');
const About = lazy('pages/About');
const Contact = lazy('pages/Contact');
const Terms = lazy('pages/Terms');
const Faq = lazy('pages/FAQ');
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
      <PublicRoute component={About} exact path="/about" />
      <PublicRoute component={Contact} exact path="/contact" />
      <PublicRoute component={Terms} exact path="/terms" />
      <PublicRoute component={Faq} exact path="/faq" />
      <PublicRoute component={NotFound} />
    </Switch>
  </>
);

export default React.memo(Routes);
