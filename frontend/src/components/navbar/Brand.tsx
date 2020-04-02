import Logo from 'assets/images/logo.png';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface BrandProps {
  changeTheme: (value: string) => void;
  switchTheme: string;
  toggled: boolean;
  toggleNav: () => void;
}

const Brand: FC<BrandProps> = ({
  changeTheme,
  switchTheme,
  toggled,
  toggleNav,
}): JSX.Element => (
  <div className="brand">
    <NavLink to="/" exact>
      <img src={Logo} alt="Website Logo" />
    </NavLink>
    <button type="button" onClick={() => changeTheme(switchTheme)}>
      Change Theme
    </button>
    <button
      type="button"
      className={toggled ? 'toggle-nav open' : 'toggle-nav'}
      onClick={toggleNav}
      aria-label="toggle navigation"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
);

export default Brand;
