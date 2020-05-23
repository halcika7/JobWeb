import React, { useEffect } from 'react';
import Activate from '@containers/Auth/Activation';
import HeadLayout from '@components/HeadLayout';
import { NextPage } from 'next';
import Router from 'next/router';
import { SessionStorage } from '@shared/sessionStorage';

const ActivatePage: NextPage<{ token: string | string[] | undefined }> = ({
  token,
}) => {
  useEffect(() => {
    if (SessionStorage.getStorage() && token) {
      SessionStorage.setValue('activate', token);
      Router.push('/activate', undefined, { shallow: true });
    }
  }, [token]);

  if (!SessionStorage.getStorage()) return null;

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
