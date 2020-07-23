import React, { FC, useEffect, useState } from 'react';

// components
import RegisterAccount from './RegisterAccount';
import RegisterFormik from './RegisterFormik';
import Breadcrumb from '@components/UI/breadcrumb';

import { Container } from '@job/styled';
import { AuthWrapper, Heading, WarningMessage } from '../styled';

import {
  useThunkDispatch,
  Actions,
  AppState,
  useSelector,
  Types,
} from '@job/redux';
import useAlert from '@hooks/useAlert';

const Register: FC<{}> = (): JSX.Element => {
  const [active, setActive] = useState<Types.AccountRegistrationType>('user');
  const State = useSelector(({ auth, country }: AppState) => ({
    errors: auth.errors,
    values: auth.values,
    touched: auth.touched,
    message: auth.message,
    status: auth.status,
    countries: country.countries,
    cities: country.cities,
  }));
  const [SweetAlert, Alert, disabled] = useAlert({
    callback: Actions.resetMessage,
    message: State.message,
    status: State.status,
  });
  const dispatch = useThunkDispatch();

  const changeAccount = (value: Types.AccountRegistrationType) =>
    value !== active && setActive(value);

  useEffect(() => {
    dispatch(Actions.getCountries());
    return () => {
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  return (
    <>
      {SweetAlert}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/auth/register', text: 'Registration' },
        ]}
      />

      <Container>
        <AuthWrapper>
          <Heading>Create Your Account</Heading>

          {Alert}

          <RegisterAccount accountType={active} changeAccount={changeAccount} />

          {active === 'user' && (
            <RegisterFormik
              accountType={active}
              countries={State.countries}
              cities={State.cities}
              errors={State.errors}
              values={State.values}
              onSubmit={Actions.registerUser}
              status={State.status}
              touched={State.touched}
              buttonDisabled={disabled}
            />
          )}

          {active === 'company' && (
            <RegisterFormik
              accountType={active}
              countries={State.countries}
              cities={State.cities}
              errors={State.errors}
              values={State.values}
              onSubmit={Actions.registerUser}
              status={State.status}
              touched={State.touched}
              buttonDisabled={disabled}
            />
          )}

          <WarningMessage>
            In case you are using a public/shared computer we recommend that you
            logout to prevent any un-authorized access to your account
          </WarningMessage>
        </AuthWrapper>
      </Container>
    </>
  );
};

export default Register;
