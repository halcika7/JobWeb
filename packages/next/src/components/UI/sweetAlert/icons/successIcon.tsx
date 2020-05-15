import React, { FC } from 'react';

import styles from './icons.module.scss';

const SuccessIcon: FC = (): JSX.Element => (
  <div className={`${styles.alert_icon} ${styles.alert_icon_success}`}>
    <span className={styles.long} />
    <span className={styles.tip} />
    <div className={styles.ring} />
    <div className={styles.corners} />
  </div>
);

export default React.memo(SuccessIcon);
