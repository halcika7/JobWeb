import React, { useState, useEffect } from 'react';
import { useThunkDispatch } from '@job/redux';
import { HTTPCodes } from '@job/common';

import SweetAlert from '@components/UI/sweetAlert';
import Alert from '@components/UI/alert';

interface Props {
  callback: () => void;
  sweetCalback?: () => void | undefined;
  message: string | undefined;
  status: number | null;
  error?: string | undefined;
}

const useAlert = ({
  callback,
  sweetCalback,
  message,
  error = undefined,
  status,
}: Props): [JSX.Element | false, JSX.Element | false, boolean] => {
  const [showSweetAlert, setShowSweetAlert] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const dispatch = useThunkDispatch();

  const sweetAlertCallback = () => {
    setShowSweetAlert(false);
    if (sweetCalback) sweetCalback();
    dispatch(callback() as any);
  };

  const alertCallback = () => {
    setShowAlert(false);
    dispatch(callback() as any);
  };

  useEffect(() => {
    if (message || error) {
      if (status === HTTPCodes.TOO_MANY_REQUESTS) {
        setShowAlert(true);
      } else {
        setShowSweetAlert(true);
      }
    }
  }, [status, message, error]);

  const sweetAlertComp = showSweetAlert && (
    <SweetAlert
      message={(message || error) as string}
      withButtons
      failedButton="Cancel"
      type="error"
      callBack={sweetAlertCallback}
    />
  );

  const alert = showAlert && (
    <Alert
      message={message as string}
      onClose={alertCallback}
      type="warning"
      autoDismiss
      autoDismissTime={2000}
    />
  );

  return [sweetAlertComp, alert, showSweetAlert || showAlert];
};

export default useAlert;
