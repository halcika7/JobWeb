/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  mapDispatchToProps,
  mapStateToProps,
  DispatchToProps,
} from './IActivation';
import Form from './Formik';
import { connect } from 'react-redux';

import { AuthWrapper, Heading, SubmitButton, Submit } from '../styled';
import { Container } from '@styled/div';

import { SessionStorage } from '@shared/sessionStorage';
import { AppState } from '@store/RootReducer';
import { AuthStateToProps } from '../IAuth';

import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import { HTTPCodes } from '@job/common';
import Alert from '@components/UI/alert';

interface OwnProps {
  activation: boolean;
}

const Activate: FC<AuthStateToProps & DispatchToProps & OwnProps> = ({
  activateAccount,
  errors,
  message,
  resendActivationLink,
  resetMessages,
  resetState,
  status,
  touched,
  values,
  activation,
}) => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const sesActivation = SessionStorage.getItem('activate');
  const router = useRouter();

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (status === HTTPCodes.OK) {
      if (activation) {
        router.push('/login');
      } else {
        router.push('/');
      }
    }
    if (activation && status !== HTTPCodes.OK) {
      router.push('/resend-activation-email');
    }
    resetMessages();
  };

  const alertCallback = () => {
    setShowAlert(false);
    resetMessages();
  };

  const activate = () => {
    setSubmitting(true);
    activateAccount();
  };

  useEffect(() => {
    if (status !== null && submitting) setSubmitting(false);
  }, [status, submitting]);

  useEffect(() => {
    if (message) {
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [status, message]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    if (activation && !sesActivation) {
      router.push('/resend-activation-email');
    }
  }, [activation, router, sessionStorage]);

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
          { href: '/activate', text: 'Activation' },
        ]}
      />

      <Container>
        <AuthWrapper>
          {!activation ? (
            <>
              <Heading>Resend Activation email</Heading>
              {showAlert && (
                <Alert
                  message={message}
                  onClose={alertCallback}
                  type="warning"
                  autoDismiss
                  autoDismissTime={2000}
                />
              )}
              <Form
                errors={errors}
                touched={touched}
                values={values}
                onSubmit={resendActivationLink}
                buttonDisabled={showSweetAlert || showAlert}
                status={status}
              />
            </>
          ) : (
            <>
              <Heading>Activate Account</Heading>
              <Submit center={1}>
                <div className="col-12 col-md-6">
                  <SubmitButton
                    type="button"
                    disabled={submitting || showSweetAlert || showAlert}
                    onClick={activate}
                  >
                    Activate Account
                  </SubmitButton>
                </div>
              </Submit>
            </>
          )}
        </AuthWrapper>
      </Container>
    </>
  );
};

export default React.memo(
  connect<AuthStateToProps, DispatchToProps, OwnProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  )(Activate)
);
