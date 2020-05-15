import React from 'react';
import Layout from '@components/Layout';

import lazy from '@lazy';

const NotFound = lazy('containers/404');

export default () => (
  <Layout>
    <NotFound />
  </Layout>
);
