import React from 'react';
import NavLink from 'next/link';

import Logo from '@images/logo.png';

import { TopContainer, TopLink, TopImg, TopSpan } from './styled';

const TopFooter = (): JSX.Element => (
  <TopContainer>
    <NavLink href="/" passHref>
      <TopLink>
        <TopImg src={Logo} alt="Alt txt" />
        <TopSpan>
          Djina
          <span className="blue">Ba</span>
          Sopo
        </TopSpan>
      </TopLink>
    </NavLink>
  </TopContainer>
);

export default TopFooter;
