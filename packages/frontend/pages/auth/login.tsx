import React from 'react';
import Login from '@containers/Auth/Login';
import HeadLayout from '@components/HeadLayout';
import { AuthProps, hideAuthRoutes } from '@components/routes/notLogged';

// import lazy from '@lazy';

// const Login = lazy('containers/Auth/Login');

const LoginPage = ({ auth }: AuthProps) => {
  return (
    <>
      <HeadLayout title="Login" description="desc" path="login" />
      <Login />
    </>
  );
};

LoginPage.getInitialProps = async ({ auth }: AuthProps) => {
  return { auth };
};

export default hideAuthRoutes(LoginPage);
