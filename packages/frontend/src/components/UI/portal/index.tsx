/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id?: string;
  children: ReactNode;
}

const Portal: FC<PortalProps> = ({ id = 'portal', children }) => {
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  );

  useEffect(() => {
    const { current } = el;

    document.body.classList.add('no-scroll');

    current.id = id;
    document.body.appendChild(current);

    return () => {
      current.parentElement!.removeChild(current);
      document.body.classList.remove('no-scroll');
    };
  }, [id]);

  return createPortal(children, el.current);
};

export default React.memo(Portal);
