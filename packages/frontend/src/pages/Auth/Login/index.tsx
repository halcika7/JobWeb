import React, { FC, useEffect, useState } from 'react';
import { HTTPCodes } from '@job/common';

// types
import { mapDispatchToProps, mapStateToProps, Props } from './ILogin';

// hooks
import { connect } from '@hooks/connect';

// components
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';
import LoginFormik from './LoginFormik';
import LoginSocial from './LoginSocial';

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
    if (
      (status === HTTPCodes.BAD_REQUEST || status === HTTPCodes.FORBIDDEN) &&
      message
    ) {
      setShowSweetAlert(true);
    } else if (status === HTTPCodes.TOO_MANY_REQUESTS && message) {
      setShowAlert(true);
    }
  }, [status, message]);

  useEffect(() => {
    return () => {
      resetMessages();
    };
  }, [resetMessages]);

  return (
    <>
      {showSweetAlert && (
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

          {showAlert && (
            <Alert
              message={message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
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

export default React.memo(connect(Login, mapStateToProps, mapDispatchToProps));
