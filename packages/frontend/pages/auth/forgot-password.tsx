import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const ResetPassword = dynamic(() => import('@containers/Auth/ResetPassword'));

const ResetPasswordLinkPage: FC<{}> = () => {
  return (
    <>
      <HeadLayout
        title="Reset Password"
        description="desc"
        path="forgot-password"
      />
      <ResetPassword resetLink />
    </>
  );
};

export default ResetPasswordLinkPage;
