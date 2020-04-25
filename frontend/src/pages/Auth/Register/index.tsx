import React, { FC, useEffect, useState } from 'react';

// actions
import { getCountries } from '@country/actions';

// types
import { AccountRegistrationType } from '../store/types';
import { Props, mapStateToProps, mapDispatchToProps } from './IRegister';

// hooks
import { useThunkDispatch } from '@store/AppThunkDispatch';
import { useHistory } from 'react-router';
import { useConnect } from '@hooks/useConnect';

// components
import RegisterAccount from './RegisterAccount';
import RegisterFormik from './RegisterFormik';
import SweetAlert from '@components/UI/asweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';

// styles
import '../Auth.scss';

const Register: FC<Props> = ({
  countries,
  cities,
  errors,
  values,
  touched,
  message,
  status,
  registerUser,
  authReset,
}): JSX.Element => {
  const [active, setActive] = useState<AccountRegistrationType>('user');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const routerHistory = useHistory();
  const dispatch = useThunkDispatch();

  const changeAccount = (value: AccountRegistrationType) => {
    if (value !== active) setActive(value);
  };

  const alertCallback = () => {
    setShowAlert(false);
    authReset();

    if (status === 200) {
      routerHistory.push('/login');
    }
  };

  useEffect(() => {
    dispatch(getCountries);
  }, [dispatch]);

  useEffect(() => {
    if (status && message) setShowAlert(true);
  }, [status, message]);

  return (
    <>
      {showAlert && (
        <SweetAlert
          message={message}
          withButtons
          successButton="OK"
          failedButton="Cancel"
          type={status !== 200 ? 'error' : 'success'}
          callBack={alertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/register', text: 'Registration' },
        ]}
      />

      <div className="container">
        <section className="registration">
          <h1>Create Your Account</h1>
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
            buttonDisabled={showAlert}
          />
          <p className="warning">
            In case you are using a public/shared computer we recommend that you
            logout to prevent any un-authorized access to your account
          </p>
        </section>
      </div>
    </>
  );
};

export default React.memo(
  useConnect(Register, mapStateToProps, mapDispatchToProps)
);
