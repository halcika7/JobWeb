import React, { FC, MouseEvent } from 'react';

// components
import Portal from '../portal';
import ErrorIcon from './icons/errorIcon';
import InfoIcon from './icons/infoIcon';
import SuccessIcon from './icons/successIcon';
import WarningIcon from './icons/warningIcon';

// styles
import './sweetAlert.scss';

interface SweetAlertProps {
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  successButton?: string;
  failedButton?: string;
  withButtons?: boolean;
  callBack?: () => void;
  successCB?: () => void;
}

const SweetAlert: FC<SweetAlertProps> = ({
  message,
  type = 'success',
  successButton,
  failedButton,
  withButtons = true,
  callBack,
}): JSX.Element => {
  const close = (e: MouseEvent) => {
    if (callBack) {
      callBack();
    }
  };

  return (
    <Portal>
      <div className="sweet-alert-wrapper">
        <div className="backdrop" onClick={e => close(e)} />
        <div className="sweet-alert">
          {type === 'success' && <SuccessIcon />}
          {type === 'warning' && <WarningIcon />}
          {type === 'info' && <InfoIcon />}
          {type === 'error' && <ErrorIcon />}
          <p>{message}</p>
          {withButtons && (
            <div className="buttons">
              {failedButton && type === 'error' && (
                <button type="button" onClick={e => close(e)}>
                  {failedButton}
                </button>
              )}
              {successButton && type === 'success' && (
                <button
                  type="button"
                  className="success"
                  onClick={e => close(e)}
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
