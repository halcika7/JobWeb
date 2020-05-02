import React, { FC } from 'react';

import './Spinner.scss';

const LargeSpinner: FC = (): JSX.Element => (
  <div className="wrapper-large">
    <div className="large-spinner" />
  </div>
);

export default LargeSpinner;
