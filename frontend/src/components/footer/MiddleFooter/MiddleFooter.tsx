import React from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import FooterLinks from './FooterLinks';

const MiddleFooter = (): JSX.Element => (
  <div className="middle">
    <div className="grid-item">
      <h3>Who We Are</h3>
      <div className="content">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          voluptatum adipisci, iure temporibus totam dolorum?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, deserunt.
        </p>
        <a href="/">
          <IoMdAddCircle />
          read more
        </a>
      </div>
    </div>
    <FooterLinks title="For candidate" linksType="candidates" />
    <FooterLinks title="For employers" linksType="employers" />
    <FooterLinks title="Information" linksType="information" />
  </div>
);

export default MiddleFooter;
