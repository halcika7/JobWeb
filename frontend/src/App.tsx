import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';

const App: FC = (): JSX.Element => {
  useEffect(() => {
    const parts = document.cookie.split('; ');
    let changed = false;
    parts.forEach(part => {
      const [name, value] = part.split('=');
      if (name === 'theme') {
        document.body.classList.value = value;
        changed = true;
      }
    });

    if (!changed) {
      document.body.classList.value = 'light';
    }
  }, []);

  return (
    <>
      <Helmet titleTemplate="MySite.com - %s">
        <title>Hello World</title>
      </Helmet>
      <Navbar />
      <main className="main-content">
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};

export default React.memo(App);
