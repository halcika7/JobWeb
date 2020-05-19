import React from 'react';

import { ReactComponent as Email } from '@svgs/email.svg';
import { ReactComponent as Fax } from '@svgs/fax.svg';
import { ReactComponent as MapMarker } from '@svgs/map-marker.svg';
import { ReactComponent as Phone } from '@svgs/phone.svg';

import {
  IconsGrid,
  GridItem,
  GridIcon,
  GridHeading,
  GridParagraph,
} from './styled';

const ContactCards = (): JSX.Element => (
  <IconsGrid>
    <GridItem>
      <GridIcon>
        <MapMarker />
      </GridIcon>
      <GridHeading>Address</GridHeading>
      <GridParagraph>214 West Arnold St. New York, NY 10002</GridParagraph>
    </GridItem>
    <GridItem>
      <GridIcon>
        <Phone />
      </GridIcon>
      <GridHeading>Phone Number</GridHeading>
      <GridParagraph>(456) 478-2589</GridParagraph>
    </GridItem>
    <GridItem>
      <GridIcon>
        <Email />
      </GridIcon>
      <GridHeading>Email</GridHeading>
      <GridParagraph>support@email.com</GridParagraph>
    </GridItem>
    <GridItem>
      <GridIcon>
        <Fax />
      </GridIcon>
      <GridHeading>Fax</GridHeading>
      <GridParagraph>(123) 345-6789</GridParagraph>
    </GridItem>
  </IconsGrid>
);

export default ContactCards;
