import React from 'react';
import Register from '@containers/Auth/Register';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const Register = lazy('containers/Auth/Register');

export default function RegisterPage() {
  return (
    <>
      <HeadLayout title="Registration" description="desc" path="register" />
      <Register />
    </>
  );
}
