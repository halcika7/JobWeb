import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const Register = dynamic(() => import('@containers/Auth/Register'));

export default function RegisterPage() {
  return (
    <>
      <HeadLayout title="Registration" description="desc" path="register" />
      <Register />
    </>
  );
}
