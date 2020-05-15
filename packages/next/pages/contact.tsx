import React from 'react';
import Layout from '@components/Layout';
import Contact from '@containers/Contact';

// import lazy from '@lazy';

// const Contact = lazy('containers/Contact');

export default function ContactPage() {
  return (
    <Layout>
      <Contact />
    </Layout>
  );
}
