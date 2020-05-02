import React, { FC } from 'react';

import './icons.scss';

const ErrorIcon: FC = (): JSX.Element => (
  <div className="alert-icon alert-icon-error">
    <span className="sa-x-mark">
      <span className="sa-line sa-left" />
      <span className="sa-line sa-right" />
    </span>
  </div>
);

export default React.memo(ErrorIcon);
