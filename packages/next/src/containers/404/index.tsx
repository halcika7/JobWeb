import React from 'react';
import Link from 'next/link';

import styles from './404.module.scss';

const NotFound = (): JSX.Element => (
  <section className={`${styles.not_found} container`}>
    <div className="wp">
      <h1>Oops!</h1>
    </div>
    <h2>404 - Page not found</h2>
    <p>
      The page you are looking for might have been removed, had its name changed
      or is temporarily unavailable.
    </p>
    <Link href="/">
      <a>Home</a>
    </Link>
  </section>
);

export default NotFound;
