import React, { FC, useEffect, useState } from 'react';

// types
import { mapDispatchToProps, mapStateToProps, Props } from './ILogin';

// hooks
import { useConnect } from '@hooks/useConnect';

// components
import SweetAlert from '@components/UI/asweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';
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
  limit,
  loginUser,
  resetMessages,
}): JSX.Element => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const sweetAlertCallback = () => setShowSweetAlert(false);

  const alertCallback = () => {
    setShowAlert(false);
    resetMessages();
  };

  useEffect(() => {
    if ((status === 400 || status === 403) && message) {
      setShowSweetAlert(true);
    } else if (status === 429 && message) {
      setShowAlert(true);
    }
  }, [status, message]);

  return (
    <>
      {message && showSweetAlert && (
        <SweetAlert
          message={message}
          additionalMessage={limit}
          withButtons
          failedButton="Cancel"
          type="error"
          callBack={sweetAlertCallback}
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

          {status === 429 && showAlert && (
            <Alert message={message} onClose={alertCallback} type="warning" />
          )}

          <LoginFormik
            errors={errors}
            values={values}
            touched={touched}
            status={status}
            onSubmit={loginUser}
            buttonDisabled={showSweetAlert || showAlert}
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
