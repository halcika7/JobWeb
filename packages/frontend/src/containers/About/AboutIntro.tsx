import React from 'react';

import Img from '@images/about.png';

import { Intro, IntroHeading, IntroParagraph, IntroImg } from './styled';

const AboutIntro = (): JSX.Element => (
  <Intro as="section">
    <div className="col-12 col-md-6">
      <IntroHeading>
        Millions of jobs, finds the one that&apos;s right for you
      </IntroHeading>
    </div>
    <div className="col-lg-10">
      <IntroParagraph>
        We also know those epic stories, those modern-day legends surrounding
        the early failures of such supremely successful folks as Michael Jordan
        and Bill Gates. We can look a bit further back in time to Albert
        Einstein or even further back to Abraham Lincoln.
      </IntroParagraph>
      <IntroImg src={Img} alt="about" />
    </div>
  </Intro>
);

export default AboutIntro;
