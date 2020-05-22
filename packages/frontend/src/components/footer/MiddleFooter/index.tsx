import React from 'react';
import FooterLinks from './FooterLinks';
import { IoMdAddCircle } from 'react-icons/io';

import { MiddleContainer, GridItem, Content, Heading3 } from '../styled';

const MiddleFooter = (): JSX.Element => (
  <MiddleContainer>
    <GridItem>
      <Heading3>Who We Are</Heading3>
      <Content>
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
      </Content>
    </GridItem>
    <FooterLinks title="For candidate" linksType="candidates" />
    <FooterLinks title="For employers" linksType="employers" />
    <FooterLinks title="Information" linksType="information" />
  </MiddleContainer>
);

export default MiddleFooter;
