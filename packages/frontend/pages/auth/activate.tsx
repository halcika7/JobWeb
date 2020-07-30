import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NextPage } from 'next';
import Router from 'next/router';
import { SessionStorage } from '@job/redux';
import HeadLayout from '@components/HeadLayout';
import LargeSpinner from '@components/UI/Spinner/LargeSpinner';

const Activate = dynamic(() => import('@containers/Auth/Activation'));

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
