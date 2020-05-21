import React from 'react';
import Login from '@containers/Auth/Login';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const Login = lazy('containers/Auth/Login');

export default function LoginPage() {
  return (
    <>
      <HeadLayout title="Login" description="desc" path="login" />
      <Login />
    </>
  );
}
