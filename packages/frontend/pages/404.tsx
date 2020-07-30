import React from 'react';
import dynamic from 'next/dynamic';
import HeadLayout from '@components/HeadLayout';

const NotFound = dynamic(() => import('@containers/404'));

export default function Custom404() {
  return (
    <>
      <HeadLayout title="404" description="desc" path="404" />
      <NotFound />
    </>
  );
}
