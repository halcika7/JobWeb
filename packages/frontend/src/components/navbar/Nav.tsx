import React, { FC } from 'react';
import Link from 'next/link';

import { NavLink, Navigation } from './styled';

const Nav: FC = (): JSX.Element => (
  <Navigation as="nav">
    <Link href="/contact" passHref>
      <NavLink>Contact</NavLink>
    </Link>
    <Link href="/about" passHref>
      <NavLink>About</NavLink>
    </Link>
    <Link href="/terms" passHref>
      <NavLink>Terms</NavLink>
    </Link>
    <Link href="/faq" passHref>
      <NavLink>FAQ</NavLink>
    </Link>
  </Navigation>
);

export default Nav;
