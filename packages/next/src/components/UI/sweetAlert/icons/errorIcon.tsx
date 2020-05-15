import React, { FC } from 'react';

import styles from './icons.module.scss';

const ErrorIcon: FC = (): JSX.Element => (
  <div className={`${styles.alert_icon} ${styles.alert_icon_error}`}>
    <span className={`${styles.sa_x_mark}`}>
      <span className={`${styles.sa_line} ${styles.sa_left}`} />
      <span className={`${styles.sa_line} ${styles.sa_right}`} />
    </span>
  </div>
);

export default React.memo(ErrorIcon);
