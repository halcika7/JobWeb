import React from 'react';
import Layout from '@components/Layout';
import About from '@containers/About';

// import lazy from '@lazy';

// const About = lazy('containers/About');

export default function AboutPage() {
  return (
    <Layout>
      <About />
    </Layout>
  );
}
