import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React from 'react';
import './About.scss';
import AboutIcons from './AboutIcons';
import AboutIntro from './AboutIntro';
import AboutEx from './AboutEx';
import AboutNumbers from './AboutNumbers';
import AboutUs from './AboutUs';

const About = () => {
  return (
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
};

export default About;
