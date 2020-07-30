import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const FAQ = dynamic(() => import('@containers/FAQ'));

export default function Faq() {
  return (
    <>
      <HeadLayout title="FAQ" description="desc" path="faq" />
      <FAQ />
    </>
  );
}
