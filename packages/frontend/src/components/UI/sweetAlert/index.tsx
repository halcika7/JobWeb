import React, { FC } from 'react';

import Portal from '../portal';
import ErrorIcon from './icons/errorIcon';
import InfoIcon from './icons/infoIcon';
import SuccessIcon from './icons/successIcon';
import WarningIcon from './icons/warningIcon';

import styles from './sweetAlert.module.scss';

export type AlertType = 'success' | 'warning' | 'info' | 'error';

interface SweetAlertProps {
  message: string;
  additionalMessage?: string;
  type?: AlertType;
  successButton?: string;
  failedButton?: string;
  withButtons?: boolean;
  callBack?: () => void;
}

const SweetAlert: FC<SweetAlertProps> = ({
  message,
  additionalMessage,
  type = 'success',
  successButton,
  failedButton,
  withButtons = true,
  callBack,
}): JSX.Element => {
  const close = () => {
    if (callBack) callBack();
  };

  return (
    <Portal>
      <div className={styles.sweet_alert_wrapper}>
        <div className={styles.backdrop} onClick={close} />
        <div className={styles.sweet_alert}>
          {type === 'success' && <SuccessIcon />}
          {type === 'warning' && <WarningIcon />}
          {type === 'info' && <InfoIcon />}
          {type === 'error' && <ErrorIcon />}
          <p>{message}</p>
          {additionalMessage && <p>{additionalMessage}</p>}
          {withButtons && (
            <div className={styles.buttons}>
              {failedButton && type === 'error' && (
                <button type="button" onClick={close}>
                  {failedButton}
                </button>
              )}
              {successButton && type === 'success' && (
                <button
                  type="button"
                  className={styles.success}
                  onClick={close}
                >
                  {successButton}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default React.memo(SweetAlert);
