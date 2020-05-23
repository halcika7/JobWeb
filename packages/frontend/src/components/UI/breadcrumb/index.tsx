import React, { FC } from 'react';
import Link from 'next/link';
import { BreadcrumbDiv, BredcrumbContainer, Anchor } from './styled';

import { FaAngleRight } from 'react-icons/fa';

type BreadcrumbType = {
  href: string;
  text: string;
};

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbType[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ breadcrumbs }): JSX.Element => (
  <BreadcrumbDiv>
    <BredcrumbContainer>
      {breadcrumbs.map(({ href, text }, index) => (
        <Link href={href} key={`${href}${text}`} passHref>
          <Anchor>
            {text}
            {index < breadcrumbs.length - 1 && <FaAngleRight />}
          </Anchor>
        </Link>
      ))}
    </BredcrumbContainer>
  </BreadcrumbDiv>
);

export default React.memo(Breadcrumb);
