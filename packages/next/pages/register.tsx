import React from 'react';
import Layout from '@components/Layout';

import lazy from '@lazy';

const Register = lazy('containers/Auth/Register');

export default function RegisterPage() {
  return (
    <Layout>
      <Register />
    </Layout>
  );
}
