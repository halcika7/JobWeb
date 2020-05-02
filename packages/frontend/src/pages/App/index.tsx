import React, { FC, Suspense, useEffect } from 'react';

// helmet component
import { Helmet } from 'react-helmet-async';

// routes
import Routes from '@routes';

// actions
import { refreshToken } from '@pages/Auth/store/actions';

// hooks
import { useThunkDispatch } from '@store/AppThunkDispatch';

// components
import Footer from '@components/footer';
import Navbar from '@components/navbar';
import ScrollToTop from '@components/scrollToTop';
import LargeSpinner from '@components/UI/Spinner/LargeSpinner';
import { SessionStorage } from '@shared/sessionStorage';

const App: FC = (): JSX.Element => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (SessionStorage.getAuthenticated()) {
      dispatch(refreshToken);
    }
  }, [dispatch]);

  useEffect(() => {
    const parts = document.cookie.split('; ');
    let changed = false;

    parts.forEach(part => {
      const [name, value] = part.split('=');
      if (name === 'theme') {
        document.body.classList.value = value;
        changed = true;
      }
    });

    if (!changed) {
      document.body.classList.value = 'light';
    }
  }, []);

  return (
    <>
      <Helmet titleTemplate="MySite.com - %s">
        <title>Hello World</title>
      </Helmet>
      <Navbar />
      <main className="main-content">
        <ScrollToTop />
        <Suspense fallback={<LargeSpinner />}>
          <Routes />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default React.memo(App);
