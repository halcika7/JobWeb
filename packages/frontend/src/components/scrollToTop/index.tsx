import React, { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop: React.FC = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scroll({ behavior: 'smooth', left: 0, top: 0 });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
