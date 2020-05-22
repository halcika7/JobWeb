import React from 'react';
import NotFound from '@containers/404';
import HeadLayout from '@components/HeadLayout';

// import lazy from '@lazy';

// const NotFound = lazy('containers/404');

export default function Custom404() {
  return (
    <>
      <HeadLayout title="404" description="desc" path="404" />
      <NotFound />
    </>
  );
}
