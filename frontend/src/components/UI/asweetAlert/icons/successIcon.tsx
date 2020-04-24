import React, { FC } from 'react';

// styles
import './icons.scss';

const SuccessIcon: FC = (): JSX.Element => (
  <div className="alert-icon alert-icon-success">
    <span className="long" />
    <span className="tip" />
    <div className="ring" />
    <div className="corners" />
  </div>
);

export default React.memo(SuccessIcon);
