import React, { FC } from 'react';

import styles from './Spinner.module.scss';

const LargeSpinner: FC = (): JSX.Element => (
  <div className={`${styles.wrapper_large}`}>
    <div className={`${styles.large_spinner}`} />
  </div>
);

export default LargeSpinner;
