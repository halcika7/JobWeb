import React from 'react';

import { ReactComponent as Plus } from '@svgs/plus.svg';

import { GridNumbers, GridNumber, GridNumberParagraph } from './styled';

const AboutNumbers = (): JSX.Element => (
  <GridNumbers>
    <GridNumber>
      <GridNumberParagraph>
        2540 <Plus />
      </GridNumberParagraph>
      <GridNumberParagraph>Jobs Available</GridNumberParagraph>
    </GridNumber>
    <GridNumber>
      <GridNumberParagraph>
        7325 <Plus />
      </GridNumberParagraph>
      <GridNumberParagraph>Members</GridNumberParagraph>
    </GridNumber>
    <GridNumber>
      <GridNumberParagraph>
        1924 <Plus />
      </GridNumberParagraph>
      <GridNumberParagraph>Resumes</GridNumberParagraph>
    </GridNumber>
    <GridNumber>
      <GridNumberParagraph>
        4275 <Plus />
      </GridNumberParagraph>
      <GridNumberParagraph>Companies</GridNumberParagraph>
    </GridNumber>
  </GridNumbers>
);

export default AboutNumbers;
