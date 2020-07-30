import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const Terms = dynamic(() => import('@containers/Terms'));

export default function TermsPage() {
  return (
    <>
      <HeadLayout title="Terms" description="desc" path="terms" />
      <Terms />
    </>
  );
}
