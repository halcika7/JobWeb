import React from 'react';
import Layout from '@components/Layout';

import lazy from '@lazy';

const FAQ = lazy('containers/FAQ');

export default function Faq() {
  return (
    <Layout>
      <FAQ />
    </Layout>
  );
}
