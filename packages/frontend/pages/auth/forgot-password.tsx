import React, { FC } from 'react';
import ResetPassword from '@containers/Auth/ResetPassword';
import HeadLayout from '@components/HeadLayout';

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
