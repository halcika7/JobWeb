import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';

import { BottomContainer, Links } from './styled';

const BottomFooter = (): JSX.Element => (
  <BottomContainer>
    <p>
      © 2020 - {new Date().getFullYear().toString().slice(2)} Djina Ba Sopo. All
      Rights Reserved.
    </p>
    <Links>
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
    </Links>
  </BottomContainer>
);

export default BottomFooter;
