import React from 'react';
import Activate from '@containers/Auth/Activation';
import HeadLayout from '@components/HeadLayout';
import { SessionStorage } from '@shared/sessionStorage';

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
