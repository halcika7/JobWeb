import React, { FC, useEffect, useState } from 'react';

// types
import { AlertType } from '../asweetAlert';

// icons
import { FaTimes } from 'react-icons/fa';

// styles
import './alert.scss';

interface AlertProps {
  message: string;
  onClose: () => void;
  type?: AlertType;
  autoDismiss?: boolean;
  autoDismissTime?: number;
}

const Alert: FC<AlertProps> = ({
  message,
  type,
  autoDismiss = false,
  autoDismissTime = 3000,
  onClose,
}): JSX.Element => {
  const [dismissing, setDismissing] = useState<boolean>(false);

  useEffect(() => {
    let handler: any = null;
    if (autoDismiss) {
      handler = setTimeout(() => onClose(), autoDismissTime);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [autoDismiss, autoDismissTime, onClose]);

  useEffect(() => {
    let handler: any = null;

    if (dismissing) {
      handler = setTimeout(() => {
        onClose();
      }, 500);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [dismissing, onClose]);

  return (
    <div className={!dismissing ? `alert ${type}` : `alert ${type} hiding`}>
      {!autoDismiss && (
        <button type="button" onClick={e => setDismissing(true)}>
          <FaTimes />
        </button>
      )}
      {message}
    </div>
  );
};

export default Alert;
