import React, { FC, useEffect, useState } from 'react';
import { AppState, useSelector, useThunkDispatch, Actions } from '@job/redux';
import { HTTPCodes } from '@job/common';
import { useRouter } from 'next/router';

// components
import Formik from './Formik';
import SweetAlert from '@components/UI/sweetAlert';
import Breadcrumb from '@components/UI/breadcrumb';
import Alert from '@components/UI/alert';

// styled components
import { Container } from '@job/styled';
import { AuthWrapper, Heading } from '../styled';

interface OwnProps {
  resetLink: boolean;
}

const ForgotPassword: FC<OwnProps> = ({ resetLink }) => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const State = useSelector((state: AppState) => ({
    errors: state.auth.errors,
    values: state.auth.values,
    touched: state.auth.touched,
    message: state.auth.message,
    status: state.auth.status,
  }));
  const router = useRouter();
  const dispatch = useThunkDispatch();

  const onSubmitForm = (data: {
    email?: string;
    password?: string;
    password2?: string;
  }) => {
    if (resetLink) {
      dispatch(Actions.sendResetPasswordLink(data.email as string));
    } else {
      dispatch(
        Actions.resetPassword(data.password as string, data.password2 as string)
      );
    }
  };

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);

    if (State.status === HTTPCodes.OK) {
      if (!resetLink) {
        router.push('/auth/login');
      } else {
        router.push('/');
      }
    }

    if (!resetLink && State.status !== HTTPCodes.UNAUTHORIZED) {
      router.push('/auth/forgot-password');
    }

    dispatch(Actions.resetMessages());
  };

  const alertCallback = () => {
    setShowAlert(false);
    dispatch(Actions.resetMessages());
  };

  useEffect(() => {
    return () => {
      dispatch(Actions.resetState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (State.message) {
      if (State.status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [State.status, State.message]);

  return (
    <>
      {showSweetAlert && (
        <SweetAlert
          message={State.message}
          withButtons
          successButton="OK"
          failedButton="Cancel"
          type={State.status !== HTTPCodes.OK ? 'error' : 'success'}
          callBack={sweetAlertCallback}
        />
      )}

      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          {
            href: resetLink ? '/auth/forgot-password' : '/auth/reset',
            text: resetLink ? 'Forgot Password' : 'Reset Password',
          },
        ]}
      />
      <Container>
        <AuthWrapper>
          <Heading>{resetLink ? 'Forgot Password' : 'Reset Password'}</Heading>

          {showAlert && (
            <Alert
              message={State.message}
              onClose={alertCallback}
              type="warning"
              autoDismiss
              autoDismissTime={2000}
            />
          )}

          <Formik
            errors={State.errors}
            status={State.status}
            touched={State.touched}
            values={State.values}
            buttonDisabled={showSweetAlert || showAlert}
            onSubmit={onSubmitForm}
            resetLink={resetLink}
          />
        </AuthWrapper>
      </Container>
    </>
  );
};

export default React.memo(ForgotPassword);
