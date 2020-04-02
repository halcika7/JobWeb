import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.scss';
import RegisterAccount from './RegisterAccount';
import RegisterInputs from './RegisterInputs';
import RegisterSubmit from './RegisterSubmit';

export type AccountRegistrationType = 'user' | 'company';

const Register = () => {
  const [active, setActive] = useState<AccountRegistrationType>('user');

  const changeAccount = (value: AccountRegistrationType) => {
    if (value !== active) {
      setActive(value);
    }
  };

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
          <RegisterInputs accountType={active} />
          <p className="accept-terms">
            By hitting the "Sign up" button, you agree to the{' '}
            <Link to="/">Terms conditions</Link> and{' '}
            <Link to="/">Privacy Policy</Link>
          </p>
          <RegisterSubmit />
          <p className="warning">
            In case you are using a public/shared computer we recommend that you
            logout to prevent any un-authorized access to your account
          </p>
        </section>
      </div>
    </>
  );
};

export default React.memo(Register);
