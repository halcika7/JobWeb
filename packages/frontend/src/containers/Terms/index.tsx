import React from 'react';

import Breadcrumb from '@components/UI/breadcrumb';

import { Heading, Heading3, Li, Term, TermsSection, Ul } from './styled';

const Terms = () => (
  <>
    <Breadcrumb
      breadcrumbs={[
        { href: '/', text: 'Home' },
        { href: '/terms', text: 'Terms and conditions' },
      ]}
    />

    <TermsSection>
      <Heading>Terms and Conditions</Heading>
      <Term>
        <Heading3>1. Description of Service</Heading3>
        <p>
          Making a decision to do something – this is the first step. We all
          know that nothing moves until someone makes a decision. The first
          action is always in making the decision to proceed.
        </p>
      </Term>
      <Term>
        <Heading3>2. Your Registration Obligations</Heading3>
        <p>
          Focus is having the unwavering attention to complete what you set out
          to do. There are a million distractions in every facet of our lives.
          Telephones and e-mail, clients and managers, spouses and kids, TV,
          newspapers and radio – the distractions are everywhere and endless.
          Everyone wants a piece of us and the result can be totally
          overwhelming.
        </p>
      </Term>
      <Term>
        <Heading3>3. User Account, Password, and Security</Heading3>
        <p>
          So, how can we stay on course with all the distractions in our lives?
          Willpower is a good start, but it’s very difficult to stay on track
          simply through willpower.
        </p>
      </Term>
      <Term>
        <Heading3>4. User Conduct</Heading3>
        <p>
          We also know those epic stories, those modern-day legends surrounding
          the early failures of such supremely successful folks as Michael
          Jordan and Bill Gates. We can look a bit further back in time to
          Albert Einstein or even further back to Abraham Lincoln. What made
          each of these people so successful? Motivation.
        </p>
        <Ul>
          <Li>If success is a process with a number of defined steps,</Li>
          <Li>Commit your decision to paper, just to bring it into focus.</Li>
          <Li>
            Without clarity, you send a very garbled message out to the
            Universe.
          </Li>
          <Li>You will run aground and become hopelessly stuck in the mud</Li>
          <Li>Simply by asking ourselves lots of questions</Li>
        </Ul>
      </Term>
      <Term>
        <Heading3>5. International Use</Heading3>
        <p>
          We also know those epic stories, those modern-day legends surrounding
          the early failures of such supremely successful folks as Michael
          Jordan and Bill Gates. We can look a bit further back in time to
          Albert Einstein or even further back to Abraham Lincoln. What made
          each of these people so successful? Motivation.
        </p>
      </Term>
    </TermsSection>
  </>
);

export default Terms;
