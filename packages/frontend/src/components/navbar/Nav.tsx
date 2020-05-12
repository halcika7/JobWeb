import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

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
    <NavLink to="/contact" activeClassName="active-link">
      Contact
    </NavLink>
    <NavLink to="/about" activeClassName="active-link">
      About
    </NavLink>
    <NavLink to="/terms" activeClassName="active-link">
      Terms
    </NavLink>
    <NavLink to="/faq" activeClassName="active-link">
      FAQ
    </NavLink>
  </nav>
);

export default Nav;
