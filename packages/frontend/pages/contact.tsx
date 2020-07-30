import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const Contact = dynamic(() => import('@containers/Contact'));

export default function ContactPage() {
  return (
    <>
      <HeadLayout title="Contact" description="desc" path="contact" />
      <Contact />
    </>
  );
}
