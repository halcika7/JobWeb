import React from 'react';

import Breadcrumb from '@components/UI/breadcrumb';
import AboutEx from './AboutEx';
import AboutIcons from './AboutIcons';
import AboutIntro from './AboutIntro';
import AboutNumbers from './AboutNumbers';
import AboutUs from './AboutUs';

import { Container } from '@styled/div';
import { AboutSection } from './styled';

const About = (): JSX.Element => (
  <>
    <Breadcrumb
      breadcrumbs={[
        { href: '/', text: 'Home' },
        { href: '/about', text: 'About Us' },
      ]}
    />
    <Container>
      <AboutSection>
        <AboutIntro />
        <AboutIcons />
        <AboutEx />
        <AboutNumbers />
        <AboutUs />
      </AboutSection>
    </Container>
  </>
);

export default About;
