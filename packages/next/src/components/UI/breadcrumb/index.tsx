import React, { FC } from 'react';
import Link from 'next/link';

import { FaAngleRight } from 'react-icons/fa';

import styles from './breadcrumb.module.scss';

type BreadcrumbType = {
  href: string;
  text: string;
};

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbType[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumbs }): JSX.Element => (
  <div className={`${styles.breadcrumb}`}>
    <div className={`${styles.container} container`}>
      {breadcrumbs.map(({ href, text }, index) => (
        <Link href={href} key={`${href}${text}`}>
          <a>
            {text}
            {index < breadcrumbs.length - 1 && <FaAngleRight />}
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default React.memo(Breadcrumb);
