import React, { FC, useEffect, useState } from 'react';

// hooks
import Router, { useRouter } from 'next/router';
import {
  useSelector,
  useThunkDispatch,
  CookieService,
  Actions,
  AppState,
} from '@job/redux';
import useAlert from '@hooks/useAlert';

// components
import Breadcrumb from '@components/UI/breadcrumb';
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
import { Container } from '@styled';
import { motion } from 'framer-motion';

const Login: FC<{}> = (): JSX.Element => {
  const [error, setError] = useState<string>('');
  const [tok, setToken] = useState<string>('');
  const State = useSelector(({ auth }: AppState) => ({
    errors: auth.errors,
    values: auth.values,
    touched: auth.touched,
    message: auth.message,
    status: auth.status,
    isAuthenticated: auth.isAuthenticated,
  }));
  const [SweetAlert, Alert, disabled] = useAlert({
    callback: Actions.resetMessage,
    message: State.message,
    error,
    status: State.status,
  });
  const dispatch = useThunkDispatch();
  const router = useRouter();

  const { err, token } = router.query;

  useEffect(() => {
    return () => {
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (tok) {
      CookieService.setToken(tok);

      const { role } = Actions.getTokenRole(tok);

      dispatch(Actions.loginSuccess(true, role));
    }
  }, [tok, dispatch]);

  useEffect(() => {
    if (State.isAuthenticated) router.push('/');
  }, [State.isAuthenticated, router]);

  useEffect(() => {
    if (err) setError(err as string);

    if (token) setToken(token as string);

    if (err || token) Router.push('/auth/login', undefined, { shallow: true });
  }, [err, token]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      {SweetAlert}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/auth/login', text: 'Login' },
        ]}
      />

      <Container>
        <AuthWrapper>
          <Heading>Login To Account</Heading>

          {Alert}

          <LoginFormik
            errors={State.errors}
            values={State.values}
            touched={State.touched}
            status={State.status}
            onSubmit={Actions.loginUser}
            buttonDisabled={disabled}
          />

          <SocialDivider>
            <SocialSpanLine />
            <SocialSpanCircle>Or</SocialSpanCircle>
          </SocialDivider>
          <LoginSocial />
        </AuthWrapper>
      </Container>
    </motion.div>
  );
};

export default React.memo(Login);
