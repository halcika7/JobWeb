import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (): JSX.Element => (
  <nav className="top-navigation">
    <NavLink to="/listings" activeClassName="active-link">
      Listings
    </NavLink>
    <NavLink to="/company" activeClassName="active-link">
      Company
    </NavLink>
    <NavLink to="/candidats" activeClassName="active-link">
      Candidates
    </NavLink>
    <NavLink to="/contact" activeClassName="active-link">
      Contact
    </NavLink>
  </nav>
);

export default Nav;
