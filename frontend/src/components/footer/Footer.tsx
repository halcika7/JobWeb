import React from 'react';
import BottomFooter from './BottomFooter';
import './Footer.scss';
import MiddleFooter from './MiddleFooter/MiddleFooter';
import TopFooter from './TopFooter';

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

export default React.memo(Footer);
