import React, { FC, useEffect, useState } from 'react';
import { HTTPCodes } from '@job/common';

// types
import { mapDispatchToProps, mapStateToProps, Props } from './ILogin';

// hooks
import { connect } from '@hooks/connect';

// components
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';
import LoginFormik from './LoginFormik';
import LoginSocial from './LoginSocial';

import {
  AuthWrapper,
  Heading,
  SocialDivider,
  SocialSpanCircle,
  SocialSpanLine,
} from '../styled';
import { Container } from '@styled/div';

const Login: FC<Props> = ({
  errors,
  values,
  touched,
  message,
  status,
  loginUser,
  resetMessages,
  resetState,
}): JSX.Element => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);
    resetMessages();
  };

  const alertCallback = () => {
    setShowAlert(false);
    resetMessages();
  };

  useEffect(() => {
    if (message) {
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [status, message]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <>
      {showSweetAlert && (
        <SweetAlert
          message={message}
          withButtons
          failedButton="Cancel"
          type="error"
          callBack={sweetAlertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/login', text: 'Login' },
        ]}
      />

      <Container>
        <AuthWrapper>
          <Heading>Login To Account</Heading>

          {showAlert && (
            <Alert
              message={message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <LoginFormik
            errors={errors}
            values={values}
            touched={touched}
            status={status}
            onSubmit={loginUser}
            buttonDisabled={showSweetAlert || showAlert}
          />

          <SocialDivider>
            <SocialSpanLine />
            <SocialSpanCircle>Or</SocialSpanCircle>
          </SocialDivider>
          <LoginSocial />
        </AuthWrapper>
      </Container>
    </>
  );
};

export default React.memo(connect(Login, mapStateToProps, mapDispatchToProps));
