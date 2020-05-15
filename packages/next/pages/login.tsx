import React from 'react';
import Layout from '@components/Layout';
import Login from '@containers/Auth/Login';

// import lazy from '@lazy';

// const Login = lazy('containers/Auth/Login');

export default function LoginPage() {
  return (
    <Layout>
      <Login />
    </Layout>
  );
}
