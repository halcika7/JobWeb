import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const App: FC = (): JSX.Element => {
  useEffect(() => {
    const parts = document.cookie.split('; ');
    let changed = false;
    for (let part of parts) {
      const eq = part.split('=');
      if (eq[0] === 'theme') {
        document.body.classList.value = eq[1];
        changed = true;
      }
    }

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
      <main className="main-content"></main>
      <Footer />
    </>
  );
};

export default React.memo(App);
