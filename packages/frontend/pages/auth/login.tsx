import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';
import { AuthProps, hideAuthRoutes } from '@components/routes/notLogged';

const Login = dynamic(() => import('@containers/Auth/Login'));

const LoginPage = () => {
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
