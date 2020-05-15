import React, { FC, useEffect, useState } from 'react';

import { AlertType } from '../sweetAlert';

import { FaTimes } from 'react-icons/fa';

import styles from './alert.module.scss';

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
      handler = setTimeout(() => onClose(), 500);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [dismissing, onClose]);

  return (
    <div className={`${styles.alert_wrapper} alert-wrapper`}>
      <div
        className={
          !dismissing
            ? `${styles.alert} ${type}`
            : `${styles.alert} ${type} ${styles.hiding}`
        }
      >
        <button type="button" onClick={() => setDismissing(true)}>
          <FaTimes />
        </button>
        {message}
      </div>
    </div>
  );
};

export default Alert;