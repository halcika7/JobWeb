import React, { FC } from 'react';
import {
  SuccessIcon as Success,
  SpanLong,
  SpanTip,
  Ring,
  Corners,
} from './styled';

const SuccessIcon: FC = (): JSX.Element => (
  <Success>
    <SpanLong />
    <SpanTip />
    <Ring />
    <Corners />
  </Success>
);

export default React.memo(SuccessIcon);
