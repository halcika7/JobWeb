import React, { FC } from 'react';
import NavLink from 'next/link';

const Nav: FC = (): JSX.Element => (
  <nav className="top-navigation">
    {/* <NavLink to="/listings" activeClassName="active-link">
      Listings
    </NavLink>
    <NavLink to="/company" activeClassName="active-link">
      Company
    </NavLink>
    <NavLink to="/candidats" activeClassName="active-link">
      Candidates
    </NavLink> */}
    <NavLink href="/contact">
      <a>Contact</a>
    </NavLink>
    <NavLink href="/about">
      <a>About</a>
    </NavLink>
    <NavLink href="/terms">
      <a>Terms</a>
    </NavLink>
    <NavLink href="/faq">
      <a>FAQ</a>
    </NavLink>
  </nav>
);

export default Nav;
