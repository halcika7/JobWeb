import React from 'react';

import Breadcrumb from '@components/UI/breadcrumb';
import AboutEx from './AboutEx';
import AboutIcons from './AboutIcons';
import AboutIntro from './AboutIntro';
import AboutNumbers from './AboutNumbers';
import AboutUs from './AboutUs';

import { Container } from '@styled';
import { AboutSection } from './styled';
import { motion } from 'framer-motion';

const About = (): JSX.Element => (
  <motion.div
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
  >
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
  </motion.div>
);

export default About;
