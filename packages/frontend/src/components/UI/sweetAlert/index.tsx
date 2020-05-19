import React, { FC } from 'react';

import Portal from '../portal';
import ErrorIcon from './icons/errorIcon';
import InfoIcon from './icons/infoIcon';
import SuccessIcon from './icons/successIcon';
import WarningIcon from './icons/warningIcon';

import { SweetAlertWrapper, Backdrop, Alert, Buttons, Button } from './styled';

export type AlertType = 'success' | 'warning' | 'info' | 'error';

interface SweetAlertProps {
  message: string;
  additionalMessage?: string;
  type: AlertType;
  successButton?: string;
  failedButton?: string;
  withButtons: boolean;
  callBack: () => void;
}

const SweetAlert: FC<SweetAlertProps> = ({
  message,
  additionalMessage,
  type,
  successButton,
  failedButton,
  withButtons,
  callBack,
}): JSX.Element => {
  const close = () => callBack();

  return (
    <Portal>
      <SweetAlertWrapper>
        <Backdrop onClick={close} />
        <Alert>
          {type === 'success' && <SuccessIcon />}
          {type === 'warning' && <WarningIcon />}
          {type === 'info' && <InfoIcon />}
          {type === 'error' && <ErrorIcon />}
          <p>{message}</p>
          {additionalMessage && <p>{additionalMessage}</p>}
          {withButtons && (
            <Buttons>
              {failedButton && type === 'error' && (
                <Button type="button" onClick={close}>
                  {failedButton}
                </Button>
              )}
              {successButton && type === 'success' && (
                <Button type="button" onClick={close} success>
                  {successButton}
                </Button>
              )}
            </Buttons>
          )}
        </Alert>
      </SweetAlertWrapper>
    </Portal>
  );
};

export default React.memo(SweetAlert);
