import React from 'react';
import Layout from '@components/Layout';

import lazy from '@lazy';

const Terms = lazy('containers/Terms');

export default function TermsPage() {
  return (
    <Layout>
      <Terms />
    </Layout>
  );
}
