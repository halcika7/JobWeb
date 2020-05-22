import React from 'react';
import Terms from '@containers/Terms';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const Terms = lazy('containers/Terms');

export default function TermsPage() {
  return (
    <>
      <HeadLayout title="Terms" description="desc" path="terms" />
      <Terms />
    </>
  );
}
