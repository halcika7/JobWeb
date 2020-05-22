import React, { FC } from 'react';
import Link from 'next/link';

import {
  Heading,
  Heading2,
  NotFoundSection,
  Paragraph,
  StyledLink,
} from './styled';

interface ErrorProps {
  code?: number;
  type?: string;
}

const NotFound: FC<ErrorProps> = ({
  code = 404,
  type = 'Page not found',
}): JSX.Element => (
  <NotFoundSection as="section">
    <div className="wp">
      <Heading>Oops!</Heading>
    </div>
    <Heading2>
      {code} - {type}
    </Heading2>
    <Paragraph>
      The page you are looking for might have been removed, had its name changed
      or is temporarily unavailable.
    </Paragraph>
    <Link href="/" passHref>
      <StyledLink>Home</StyledLink>
    </Link>
  </NotFoundSection>
);

export default NotFound;
