import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
  DispatchToProps,
} from './IResetPassword';

import Formik from './Formik';
import { AuthStateToProps } from '../IAuth';
import { AppState } from '@store/RootReducer';
import SweetAlert from '@components/UI/sweetAlert';
import { HTTPCodes } from '@job/common';
import Breadcrumb from '@components/UI/breadcrumb';
import { Container } from '@styled/div';
import { AuthWrapper, Heading } from '../styled';
import Alert from '@components/UI/alert';
import { useRouter } from 'next/router';

interface OwnProps {
  resetLink: boolean;
}

const ForgotPassword: FC<AuthStateToProps & DispatchToProps & OwnProps> = ({
  errors,
  message,
  resetLink,
  resetMessages,
  resetPassword,
  resetState,
  sendResetPasswordLink,
  status,
  touched,
  values,
}) => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const router = useRouter();

  const onSubmitForm = (data: {
    email?: string;
    password?: string;
    password2?: string;
  }) => {
    if (resetLink) {
      sendResetPasswordLink(data.email as string);
    } else {
      resetPassword(data.password as string, data.password2 as string);
    }
  };

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (status === HTTPCodes.OK) {
      if (!resetLink) {
        router.push('/auth/login');
      } else {
        router.push('/');
      }
    }

    if (!resetLink && status !== HTTPCodes.UNAUTHORIZED) {
      router.push('/auth/forgot-password');
    }

    resetMessages();
  };

  const alertCallback = () => {
    setShowAlert(false);
    resetMessages();
  };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (message) {
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [status, message]);

  return (
    <>
      {showSweetAlert && (
        <SweetAlert
          message={message}
          withButtons
          successButton="OK"
          failedButton="Cancel"
          type={status !== HTTPCodes.OK ? 'error' : 'success'}
          callBack={sweetAlertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          {
            href: resetLink ? '/auth/forgot-password' : '/auth/reset',
            text: resetLink ? 'Forgot Password' : 'Reset Password',
          },
        ]}
      />
      <Container>
        <AuthWrapper>
          <Heading>{resetLink ? 'Forgot Password' : 'Reset Password'}</Heading>

          {showAlert && (
            <Alert
              message={message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <Formik
            errors={errors}
            status={status}
            touched={touched}
            values={values}
            buttonDisabled={showSweetAlert || showAlert}
            onSubmit={onSubmitForm}
            resetLink={resetLink}
          />
        </AuthWrapper>
      </Container>
    </>
  );
};

export default React.memo(
  connect<AuthStateToProps, DispatchToProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword)
);
