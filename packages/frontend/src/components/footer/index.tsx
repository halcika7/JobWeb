import React from 'react';

import { FooterWrapper } from './styled';
import { Container } from '@styled/div';

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
