import React from 'react';

import BottomFooter from './BottomFooter';
import MiddleFooter from './MiddleFooter';
import TopFooter from './TopFooter';

import './Footer.scss';

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
