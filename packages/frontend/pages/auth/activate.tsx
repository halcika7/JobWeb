import React, { useEffect } from 'react';
import Activate from '@containers/Auth/Activation';
import HeadLayout from '@components/HeadLayout';
import { NextPage } from 'next';
import Router from 'next/router';
import { SessionStorage } from '@shared/sessionStorage';
import LargeSpinner from '@components/UI/Spinner/LargeSpinner';

const ActivatePage: NextPage<{ token: string | string[] | undefined }> = ({
  token,
}) => {
  useEffect(() => {
    if (SessionStorage.getStorage() && token) {
      SessionStorage.setValue('activate', token);
      Router.push('/auth/activate', undefined, { shallow: true });
    }
  }, [token]);

  if (!SessionStorage.getStorage()) return null;

  if (
    SessionStorage.getStorage() &&
    !SessionStorage.getItem('activate') &&
    !token
  ) {
    Router.push('/auth/resend-activation-email');

    return <LargeSpinner />;
  }

  return (
    <>
      <HeadLayout title="Activate Account" description="desc" path="activate" />
      <Activate activation />
    </>
  );
};

ActivatePage.getInitialProps = ({ query }) => {
  return { token: query.token };
};

export default ActivatePage;
