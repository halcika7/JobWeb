import React, { FC } from 'react';
import Link from 'next/link';
import useDarkMode from 'use-dark-mode';

import Logo from '@images/logo.png';

import { NavLink, HeaderImg, ToggleButton } from './styled';
import { AlignCenterDiv } from '@styled/div';

interface BrandProps {
  toggled: boolean;
  toggleNav: () => void;
}

const Brand: FC<BrandProps> = ({ toggled, toggleNav }): JSX.Element => {
  const { toggle } = useDarkMode();

  return (
    <AlignCenterDiv>
      <Link href="/" passHref>
        <NavLink>
          <HeaderImg src={Logo} alt="Website Logo" />
        </NavLink>
      </Link>
      <button type="button" onClick={() => toggle()}>
        Change Theme
      </button>
      <ToggleButton
        type="button"
        onClick={toggleNav}
        aria-label="toggle navigation"
        open={toggled}
      >
        <span />
        <span />
        <span />
      </ToggleButton>
    </AlignCenterDiv>
  );
};

export default Brand;
