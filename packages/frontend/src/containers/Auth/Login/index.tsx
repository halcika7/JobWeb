import React, { FC, useEffect, useState } from 'react';
// utils
import { HTTPCodes } from '@job/common';

// hooks
import Router, { useRouter } from 'next/router';
import {
  useSelector,
  useThunkDispatch,
  CookieService,
  Actions,
  AppState,
} from '@job/redux';

// components
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';
import LoginFormik from './LoginFormik';
import LoginSocial from './LoginSocial';

// styled components
import {
  AuthWrapper,
  Heading,
  SocialDivider,
  SocialSpanCircle,
  SocialSpanLine,
} from '../styled';
import { Container } from '@styled/div';

const Login: FC<{}> = (): JSX.Element => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [tok, setToken] = useState<string>('');
  const State = useSelector((state: AppState) => ({
    errors: state.auth.errors,
    values: state.auth.values,
    touched: state.auth.touched,
    message: state.auth.message,
    status: state.auth.status,
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const dispatch = useThunkDispatch();
  const router = useRouter();

  const { err, token } = router.query;

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);
    dispatch(Actions.resetMessage());
  };

  const alertCallback = () => {
    setShowAlert(false);
    dispatch(Actions.resetMessage());
  };

  useEffect(() => {
    if (State.message || error) {
      if (State.status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [State.status, State.message, error]);

  useEffect(() => {
    return () => {
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (tok) {
      CookieService.setToken(tok as string);

      const { role } = Actions.getTokenRole(tok as string);

      dispatch(Actions.loginSuccess(true, role));
    }
  }, [tok, dispatch]);

  useEffect(() => {
    if (State.isAuthenticated) {
      router.push('/');
    }
  }, [State.isAuthenticated, router]);

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
          message={State.message || error}
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
              message={State.message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <LoginFormik
            errors={State.errors}
            values={State.values}
            touched={State.touched}
            status={State.status}
            onSubmit={Actions.loginUser}
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

export default React.memo(Login);
