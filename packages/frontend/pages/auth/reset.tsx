import React, { useEffect } from 'react';
import ResetPassword from '@containers/Auth/ResetPassword';
import HeadLayout from '@components/HeadLayout';
import { NextPage } from 'next';
import Router from 'next/router';
import { SessionStorage } from '@shared/sessionStorage';
import LargeSpinner from '@components/UI/Spinner/LargeSpinner';

const ResetPasswordLinkPage: NextPage<{
  token: string | string[] | undefined;
}> = ({ token }) => {
  useEffect(() => {
    if (SessionStorage.getStorage() && token) {
      SessionStorage.setValue('resetpassword', token);
      Router.push('/auth/reset', undefined, { shallow: true });
    }
  }, [token]);

  if (!SessionStorage.getStorage()) return null;

  if (SessionStorage.getStorage() && !SessionStorage.getItem('resetpassword')) {
    Router.push('/404');

    return <LargeSpinner />;
  }

  return (
    <>
      <HeadLayout
        title="Reset Password"
        description="desc"
        path="forgot-password"
      />
      <ResetPassword resetLink={false} />
    </>
  );
};

ResetPasswordLinkPage.getInitialProps = ({ query }) => {
  return { token: query.token };
};

export default ResetPasswordLinkPage;
