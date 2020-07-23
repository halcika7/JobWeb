import React from 'react';

import { FooterWrapper } from './styled';
import { Container } from '@job/styled';

import BottomFooter from './BottomFooter';
import MiddleFooter from './MiddleFooter';
import TopFooter from './TopFooter';

const Footer = (): JSX.Element => (
  <FooterWrapper>
    <Container as="section">
      <TopFooter />
      <MiddleFooter />
      <BottomFooter />
    </Container>
  </FooterWrapper>
);

export default Footer;
