import React from 'react';
import About from '@containers/About';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const About = lazy('containers/About');

export default function AboutPage() {
  return (
    <>
      <HeadLayout title="About" description="desc" path="about" />
      <About />
    </>
  );
}
