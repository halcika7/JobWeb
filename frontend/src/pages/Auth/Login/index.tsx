import React, { FC, useEffect, useState } from 'react';

// types
import { mapDispatchToProps, mapStateToProps, Props } from './ILogin';

// hooks
import { useConnect } from 'util/hooks/useConnect';

// components
import SweetAlert from 'components/UI/asweetAlert';
import Breadcrumb from 'components/UI/breadcrumb';
import LoginFormik from './LoginFormik';
import LoginSocial from './LoginSocial';

// styles
import '../Auth.scss';

const Login: FC<Props> = ({
  errors,
  values,
  touched,
  message,
  status,
  loginUser,
}): JSX.Element => {
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const alertCalllback = () => setShowAlert(false);

  useEffect(() => {
    if (status && status === 400) {
      setShowAlert(true);
    }
  }, [status, message]);

  return (
    <>
      {message && status && showAlert && (
        <SweetAlert
          message={message}
          withButtons
          failedButton="Cancel"
          type={status !== 200 ? 'error' : 'success'}
          callBack={alertCalllback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/login', text: 'Login' },
        ]}
      />

      <div className="container">
        <section className="login">
          <h1>Login To Account</h1>
          <LoginFormik
            errors={errors}
            values={values}
            touched={touched}
            status={status}
            onSubmit={loginUser}
            buttonDisabled={showAlert}
          />
          <div className="social-divider">
            <span className="line" />
            <span className="circle">Or</span>
          </div>
          <LoginSocial />
        </section>
      </div>
    </>
  );
};

export default React.memo(
  useConnect(Login, mapStateToProps, mapDispatchToProps)
);
