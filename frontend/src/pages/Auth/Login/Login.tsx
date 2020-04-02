import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React from 'react';
import '../Auth.scss';
import LoginInputs from './LoginInputs';
import LoginSocial from './LoginSocial';
import LoginSubmit from './LoginSubmit';

const Login = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/login', text: 'Login' },
        ]}
      />
      <div className="container">
        <section className="login">
          <h1>Login To Account</h1>
          <LoginInputs />
          <LoginSubmit />
          <div className="social-divider">
            <span className="line"></span>
            <span className="circle">Or</span>
          </div>
          <LoginSocial />
        </section>
      </div>
    </>
  );
};

export default Login;
