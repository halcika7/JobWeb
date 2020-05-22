/* eslint-disable global-require */
import React, { useState } from 'react';

import Img from '@images/about.png';

import {
  Intro,
  IntroHeading,
  IntroParagraph,
  IntroImg,
  ImageWrap,
} from './styled';

const AboutIntro = (): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Intro as="section">
      <div className="col-12 col-md-6">
        <IntroHeading>
          Millions of jobs, finds the one that&apos;s right for you
        </IntroHeading>
      </div>
      <ImageWrap className="col-lg-10">
        <IntroParagraph>
          We also know those epic stories, those modern-day legends surrounding
          the early failures of such supremely successful folks as Michael
          Jordan and Bill Gates. We can look a bit further back in time to
          Albert Einstein or even further back to Abraham Lincoln.
        </IntroParagraph>
        {!loaded && (
          <IntroImg
            src={require('@images/about.png?lqip')}
            alt="about"
            blured
            loaded
          />
        )}
        <IntroImg
          src={Img}
          alt="about"
          onLoad={() => setLoaded(true)}
          loaded={loaded}
        />
      </ImageWrap>
    </Intro>
  );
};

export default AboutIntro;
