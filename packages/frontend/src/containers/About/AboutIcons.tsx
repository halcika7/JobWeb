import React from 'react';

import { ReactComponent as Bell } from '@svgs/bell.svg';
import { ReactComponent as JobPaper } from '@svgs/job-paper.svg';
import { ReactComponent as Loupe } from '@svgs/loupe.svg';
import { ReactComponent as PaperLupa } from '@svgs/paper-lupa.svg';
import { ReactComponent as Secure } from '@svgs/secure.svg';
import { ReactComponent as StackPapers } from '@svgs/stack-papers.svg';

import { Icons, GridItem, Icon, IconsHeading, IconsParagraph } from './styled';

const AboutIcons = (): JSX.Element => (
  <Icons>
    <GridItem>
      <Icon>
        <JobPaper />
      </Icon>
      <IconsHeading>Advertise A Job</IconsHeading>
      <IconsParagraph>
        Use a past defeat as a motivator. Remind yourself you have nowhere to go
        except.
      </IconsParagraph>
    </GridItem>
    <GridItem>
      <Icon>
        <StackPapers />
      </Icon>
      <IconsHeading>Recruiter Profiles</IconsHeading>
      <IconsParagraph>
        Let success motivate you. Find a picture of what epitomizes success to
        you have already.
      </IconsParagraph>
    </GridItem>
    <GridItem>
      <Icon>
        <PaperLupa />
      </Icon>
      <IconsHeading>Find Your Dream Job</IconsHeading>
      <IconsParagraph>
        Make a list of your achievements toward your long-term goal and remind
        your.
      </IconsParagraph>
    </GridItem>
    <GridItem>
      <Icon>
        <Loupe />
      </Icon>
      <IconsHeading>Search A Jobs</IconsHeading>
      <IconsParagraph>Lorem ipsum dolor sit amet.</IconsParagraph>
    </GridItem>
    <GridItem>
      <Icon>
        <Bell />
      </Icon>
      <IconsHeading>Job Notifications</IconsHeading>
      <IconsParagraph>Lorem ipsum dolor sit amet.</IconsParagraph>
    </GridItem>
    <GridItem>
      <Icon>
        <Secure />
      </Icon>
      <IconsHeading>Job Security</IconsHeading>
      <IconsParagraph>Lorem ipsum dolor sit amet.</IconsParagraph>
    </GridItem>
  </Icons>
);

export default AboutIcons;
