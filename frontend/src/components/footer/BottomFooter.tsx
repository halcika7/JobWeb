import React from 'react';

// icons
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

const BottomFooter = (): JSX.Element => (
  <div className="bottom">
    <p>
      © 2020 -{' '}
      {new Date()
        .getFullYear()
        .toString()
        .slice(2)}{' '}
      Djina Ba Sopo. All Rights Reserved.
    </p>
    <div className="links">
      <a href="/" aria-label="facebook link">
        <FaFacebookF />
      </a>
      <a href="/" aria-label="twitter link">
        <FaTwitter />
      </a>
      <a href="/" aria-label="linkedin link">
        <FaLinkedinIn />
      </a>
      <a href="/" aria-label="instagram link">
        <FaInstagram />
      </a>
    </div>
  </div>
);

export default BottomFooter;
