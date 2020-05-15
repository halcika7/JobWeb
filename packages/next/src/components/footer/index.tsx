import React from 'react';

import BottomFooter from './BottomFooter';
import MiddleFooter from './MiddleFooter';
import TopFooter from './TopFooter';

const Footer = (): JSX.Element => (
  <footer className="footer">
    <section className="container">
      <TopFooter />
      <MiddleFooter />
      <BottomFooter />
    </section>
  </footer>
);

export default Footer;
