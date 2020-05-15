import React from 'react';
import NavLink from 'next/link';

import Logo from '@images/logo.png';

const TopFooter = (): JSX.Element => (
  <div className="top">
    <NavLink href="/">
      <a>
        <img src={Logo} alt="Alt text" />
        <span>
          Djina
          <span className="blue">Ba</span>
          Sopo
        </span>
      </a>
    </NavLink>
  </div>
);

export default TopFooter;
