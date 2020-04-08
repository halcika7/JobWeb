import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'store/RootReducer';
import '../Auth.scss';
import {
  AccountRegistrationType,
  DispatchToProps,
  mapDispatchToProps,
  mapStateToProps,
  Props,
  StateToProps,
} from './IRegister';
import RegisterAccount from './RegisterAccount';
import RegisterFormik from './RegisterFormik/RegisterFormik';

const Register: FC<Props> = ({
  countries,
  cities,
  errors,
  values,
  touched,
  message,
  status,
  getCountries,
  registerUser,
  registerReset,
}): JSX.Element => {
  const [active, setActive] = useState<AccountRegistrationType>('user');
  const [loading, setLoading] = useState<boolean>(false);

  const changeAccount = (value: AccountRegistrationType) => {
    if (value !== active) {
      setActive(value);
      setLoading(true);
      registerReset();
    }
  };

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
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
          {!loading ? (
            <RegisterFormik
              accountType={active}
              countries={countries}
              cities={cities}
              errors={errors}
              values={values}
              onSubmit={registerUser}
              status={status}
              touched={touched}
            />
          ) : (
            <div style={{ height: '100vh' }} />
          )}
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
  connect<StateToProps, DispatchToProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
