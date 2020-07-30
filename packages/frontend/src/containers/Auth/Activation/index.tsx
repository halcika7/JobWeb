/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState, useEffect } from 'react';
import Form from './Formik';

// hooks
import { useRouter } from 'next/router';
import {
  useSelector,
  useThunkDispatch,
  Actions,
  SessionStorage,
  AppState,
} from '@job/redux';

// styled components
import { AuthWrapper, Heading, SubmitButton, Submit } from '../styled';
import { Container } from '@styled';

// utils
import { HTTPCodes } from '@job/common';

// components
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';

interface OwnProps {
  activation: boolean;
}

const Activate: FC<OwnProps> = ({ activation }) => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const sesActivation = SessionStorage.getItem('activate');
  const { errors, message, status, touched, values } = useSelector(
    ({ auth }: AppState) => ({
      errors: auth.errors,
      values: auth.values,
      touched: auth.touched,
      message: auth.message,
      status: auth.status,
    })
  );
  const router = useRouter();
  const dispatch = useThunkDispatch();

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (status === HTTPCodes.OK) {
      if (activation) {
        router.push('/auth/login');
      } else {
        router.push('/');
      }
    }
    if (activation && status !== HTTPCodes.OK) {
      router.push('/auth/resend-activation-email');
    }
    dispatch(Actions.resetMessage());
  };

  const alertCallback = () => {
    setShowAlert(false);
    dispatch(Actions.resetMessage());
  };

  const activate = () => {
    setSubmitting(true);
    dispatch(Actions.activateAccount());
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
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (activation && !sesActivation) {
      router.push('/auth/resend-activation-email');
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
          { href: '/auth/activate', text: 'Activation' },
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
                onSubmit={Actions.resendActivationLink}
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

export default React.memo(Activate);
