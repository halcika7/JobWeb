import React from 'react';
import Link from 'next/link';

import {
  Heading,
  Heading2,
  NotFoundSection,
  Paragraph,
  StyledLink,
} from './styled';

const NotFound = (): JSX.Element => (
  <NotFoundSection as="section">
    <div className="wp">
      <Heading>Oops!</Heading>
    </div>
    <Heading2>404 - Page not found</Heading2>
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
