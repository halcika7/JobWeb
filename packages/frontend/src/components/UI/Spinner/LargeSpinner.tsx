import React, { FC } from 'react';

import { SpinnerWrapper, Spinner } from './styled';

const LargeSpinner: FC = (): JSX.Element => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);

export default LargeSpinner;
