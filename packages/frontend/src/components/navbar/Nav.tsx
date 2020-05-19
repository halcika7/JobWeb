import React, { FC } from 'react';
import Link from 'next/link';

import { NavLink, Navigation } from './styled';

const Nav: FC = (): JSX.Element => (
  <Navigation as="nav">
    {/* <Link to="/listings" activeClassName="active-link">
      Listings
    </Link>
    <Link to="/company" activeClassName="active-link">
      Company
    </Link>
    <Link to="/candidats" activeClassName="active-link">
      Candidates
    </Link> */}
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
