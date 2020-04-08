import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React from 'react';
import './About.scss';
import AboutEx from './AboutEx';
import AboutIcons from './AboutIcons';
import AboutIntro from './AboutIntro';
import AboutNumbers from './AboutNumbers';
import AboutUs from './AboutUs';

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
