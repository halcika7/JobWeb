import React, { FC, useEffect, useState, useCallback } from 'react';

import { AlertType } from '../sweetAlert';

import { FaTimes } from 'react-icons/fa';

import { Wrapper, AlertElement, Button } from './styled';

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

  const closeFunction = useCallback(
    (time: number, bool: boolean) => {
      let handler: any = null;

      if (bool) {
        handler = setTimeout(() => onClose(), time);
      }

      return () => {
        clearTimeout(handler);
      };
    },
    [onClose]
  );

  useEffect(() => {
    closeFunction(autoDismissTime, autoDismiss);
  }, [autoDismiss, autoDismissTime, closeFunction]);

  useEffect(() => {
    closeFunction(500, dismissing);
  }, [dismissing, closeFunction]);

  return (
    <Wrapper>
      <AlertElement type={type} hiding={dismissing}>
        <Button type="button" onClick={() => setDismissing(true)}>
          <FaTimes />
        </Button>
        {message}
      </AlertElement>
    </Wrapper>
  );
};

export default Alert;
