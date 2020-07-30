import React, { FC } from 'react';
import Link from 'next/link';

import { NavLink, Navigation } from './styled';

const Nav: FC = (): JSX.Element => (
  <Navigation as="nav">
    <Link href="/contact" passHref scroll={false}>
      <NavLink>Contact</NavLink>
    </Link>
    <Link href="/about" passHref scroll={false}>
      <NavLink>About</NavLink>
    </Link>
  </Navigation>
);

export default Nav;
