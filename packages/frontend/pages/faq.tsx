import React from 'react';
import FAQ from '@containers/FAQ';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const FAQ = lazy('containers/FAQ');

export default function Faq() {
  return (
    <>
      <HeadLayout title="FAQ" description="desc" path="faq" />
      <FAQ />
    </>
  );
}
