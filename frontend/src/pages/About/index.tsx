import React from 'react';

// components
import Breadcrumb from 'components/UI/breadcrumb';
import AboutEx from './AboutEx';
import AboutIcons from './AboutIcons';
import AboutIntro from './AboutIntro';
import AboutNumbers from './AboutNumbers';
import AboutUs from './AboutUs';

// styles
import './About.scss';

const About = (): JSX.Element => (
  <>
    <Breadcrumb
      breadcrumbs={[
        { href: '/', text: 'Home' },
        { href: '/about', text: 'About Us' },
      ]}
    />
    <div className="container">
      <section className="about">
        <AboutIntro />
        <AboutIcons />
        <AboutEx />
        <AboutNumbers />
        <AboutUs />
      </section>
    </div>
  </>
);

export default About;
