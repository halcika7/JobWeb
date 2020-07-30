import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';
import { SessionStorage } from '@job/redux';

const Activate = dynamic(() => import('@containers/Auth/Activation'));

const ActivatePage = () => {
  if (!SessionStorage.getStorage()) return null;

  return (
    <>
      <HeadLayout
        title="Reasend Activation email"
        description="desc"
        path="resend-activation-email"
      />
      <Activate activation={false} />
    </>
  );
};

export default ActivatePage;
