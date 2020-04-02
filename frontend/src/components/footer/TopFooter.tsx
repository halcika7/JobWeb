import Logo from 'assets/images/logo.png';
import React from 'react';
import { NavLink } from 'react-router-dom';

const TopFooter = (): JSX.Element => (
  <div className="top">
    <NavLink to="/" exact>
      <img src={Logo} alt="Alt text" />
      <span>
        Djina<span className="blue">Ba</span>Sopo
      </span>
    </NavLink>
  </div>
);

export default React.memo(TopFooter);
