import React, { FC, useEffect, useState } from 'react';
import { HTTPCodes } from '@job/common';

// types
import { mapDispatchToProps, mapStateToProps, Props } from './ILogin';

// hooks
import { connect } from '@hooks/connect';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

// actions
import { getTokenRole, loginSuccess } from '../store/actions';

// components
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';
import LoginFormik from './LoginFormik';
import LoginSocial from './LoginSocial';

// styles
import {
  AuthWrapper,
  Heading,
  SocialDivider,
  SocialSpanCircle,
  SocialSpanLine,
} from '../styled';
import { Container } from '@styled/div';
import { CookieService } from '@shared/cookie';

const Login: FC<Props> = ({
  errors,
  values,
  touched,
  message,
  status,
  loginUser,
  resetMessages,
  resetState,
  isAuthenticated,
}): JSX.Element => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [tok, setToken] = useState<string>('');
  const dispatch = useDispatch();
  const router = useRouter();

  const { err, token } = router.query;

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);
    resetMessages();
  };

  const alertCallback = () => {
    setShowAlert(false);
    resetMessages();
  };

  useEffect(() => {
    if (message || error) {
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [status, message, error]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (tok) {
      CookieService.setToken(tok as string);

      const { role } = getTokenRole(tok as string);

      dispatch(loginSuccess(true, role));
    }
  }, [tok, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (err) {
      setError(err as string);
      Router.push('/auth/login', undefined, { shallow: true });
    }

    if (token) {
      setToken(token as string);
      Router.push('/auth/login', undefined, { shallow: true });
    }
  }, [err, token]);

  return (
    <>
      {showSweetAlert && (
        <SweetAlert
          message={message || error}
          withButtons
          failedButton="Cancel"
          type="error"
          callBack={sweetAlertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/auth/login', text: 'Login' },
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
