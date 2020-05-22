import React, { FC } from 'react';
import { ErrorIcon as Error, SpanMark, SpanLine } from './styled';

const ErrorIcon: FC = (): JSX.Element => (
  <Error>
    <SpanMark>
      <SpanLine left />
      <SpanLine />
    </SpanMark>
  </Error>
);

export default React.memo(ErrorIcon);
