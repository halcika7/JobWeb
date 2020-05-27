import React, { FC, useEffect, useState } from 'react';
import { HTTPCodes } from '@job/common';

// actions
import { getCountries } from '@country/actions';

// types
import { AccountRegistrationType } from '../store/types';
import { Props, mapStateToProps, mapDispatchToProps } from './IRegister';

// hooks
import { useThunkDispatch } from '@store/AppThunkDispatch';
import { connect } from '@hooks/connect';

// components
import RegisterAccount from './RegisterAccount';
import RegisterFormik from './RegisterFormik';
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';

import { Container } from '@styled/div';
import { AuthWrapper, Heading, WarningMessage } from '../styled';

const Register: FC<Props> = ({
  countries,
  cities,
  errors,
  values,
  touched,
  message,
  status,
  registerUser,
  resetMessages,
  resetState,
}): JSX.Element => {
  const [active, setActive] = useState<AccountRegistrationType>('user');
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch = useThunkDispatch();

  const changeAccount = (value: AccountRegistrationType) => {
    if (value !== active) setActive(value);
  };

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (status === HTTPCodes.OK) {
      resetMessages();
      // routerHistory.push('/login');
    } else {
      resetMessages();
    }
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
    dispatch(getCountries);
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      if (
        status === HTTPCodes.BAD_REQUEST ||
        status === HTTPCodes.NOT_ACCEPTABLE ||
        status === HTTPCodes.FORBIDDEN ||
        status === HTTPCodes.OK
      ) {
        setShowSweetAlert(true);
      }
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
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
          { href: '/auth/register', text: 'Registration' },
        ]}
      />

      <Container>
        <AuthWrapper>
          <Heading>Create Your Account</Heading>

          {showAlert && (
            <Alert
              message={message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <RegisterAccount accountType={active} changeAccount={changeAccount} />

          <RegisterFormik
            accountType={active}
            countries={countries}
            cities={cities}
            errors={errors}
            values={values}
            onSubmit={registerUser}
            status={status}
            touched={touched}
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

export default React.memo(
  connect(Register, mapStateToProps, mapDispatchToProps)
);
