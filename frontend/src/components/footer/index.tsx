import React from 'react';

// components
import BottomFooter from './BottomFooter';
import MiddleFooter from './MiddleFooter';
import TopFooter from './TopFooter';

// styles
import './Footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      <section className="container">
        <TopFooter />
        <MiddleFooter />
        <BottomFooter />
      </section>
    </footer>
  );
};

export default Footer;
