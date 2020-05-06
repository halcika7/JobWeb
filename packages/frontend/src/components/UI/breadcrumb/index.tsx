import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { FaAngleRight } from 'react-icons/fa';

import './breadcrumb.scss';

type BreadcrumbType = {
  href: string;
  text: string;
};

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbType[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumbs }): JSX.Element => (
  <div className="breadcrumb">
    <div className="container">
      {breadcrumbs.map(({ href, text }, index) => (
        <Link to={href} key={`${href}${text}`}>
          {text}
          {index < breadcrumbs.length - 1 && <FaAngleRight />}
        </Link>
      ))}
    </div>
  </div>
);

export default React.memo(Breadcrumb);