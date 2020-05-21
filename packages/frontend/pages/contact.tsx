import React from 'react';
import Contact from '@containers/Contact';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const Contact = lazy('containers/Contact');

export default function ContactPage() {
  return (
    <>
      <HeadLayout title="Contact" description="desc" path="contact" />
      <Contact />
    </>
  );
}
