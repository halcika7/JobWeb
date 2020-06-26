import React, { FC, useEffect, useState } from 'react';
import { HTTPCodes } from '@job/common';

// components
import RegisterAccount from './RegisterAccount';
import RegisterFormik from './RegisterFormik';
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';

import { Container } from '@styled/div';
import { AuthWrapper, Heading, WarningMessage } from '../styled';

import {
  useThunkDispatch,
  Actions,
  AppState,
  useSelector,
  Types,
} from '@job/redux';

const Register: FC<{}> = (): JSX.Element => {
  const [active, setActive] = useState<Types.AccountRegistrationType>('user');
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const State = useSelector((state: AppState) => ({
    errors: state.auth.errors,
    values: state.auth.values,
    touched: state.auth.touched,
    message: state.auth.message,
    status: state.auth.status,
    countries: state.country.countries,
    cities: state.country.cities,
  }));
  const dispatch = useThunkDispatch();

  const changeAccount = (value: Types.AccountRegistrationType) => {
    if (value !== active) setActive(value);
  };

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (State.status === HTTPCodes.OK) {
      dispatch(Actions.resetMessage());
      // routerHistory.push('/login');
    } else {
      dispatch(Actions.resetMessage());
    }
  };

  const alertCallback = () => {
    setShowAlert(false);
    dispatch(Actions.resetMessage());
  };

  useEffect(() => {
    return () => {
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getCountries);
  }, [dispatch]);

  useEffect(() => {
    if (State.message) {
      if (
        State.status === HTTPCodes.BAD_REQUEST ||
        State.status === HTTPCodes.NOT_ACCEPTABLE ||
        State.status === HTTPCodes.FORBIDDEN ||
        State.status === HTTPCodes.OK
      ) {
        setShowSweetAlert(true);
      }
      if (State.status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      }
    }
  }, [State.status, State.message]);

  return (
    <>
      {showSweetAlert && (
        <SweetAlert
          message={State.message}
          withButtons
          successButton="OK"
          failedButton="Cancel"
          type={State.status !== HTTPCodes.OK ? 'error' : 'success'}
          callBack={sweetAlertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/auth/register', text: 'Registration' },
        ]}
      />

      <Container>
        <AuthWrapper>
          <Heading>Create Your Account</Heading>

          {showAlert && (
            <Alert
              message={State.message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <RegisterAccount accountType={active} changeAccount={changeAccount} />

          <RegisterFormik
            accountType={active}
            countries={State.countries}
            cities={State.cities}
            errors={State.errors}
            values={State.values}
            onSubmit={Actions.registerUser}
            status={State.status}
            touched={State.touched}
            buttonDisabled={showSweetAlert || showAlert}
          />

          <WarningMessage>
            In case you are using a public/shared computer we recommend that you
            logout to prevent any un-authorized access to your account
          </WarningMessage>
        </AuthWrapper>
      </Container>
    </>
  );
};

export default React.memo(Register);
