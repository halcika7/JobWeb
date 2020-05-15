import React from 'react';

import Breadcrumb from '@components/UI/breadcrumb';

const Terms = () => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/terms', text: 'Terms and conditions' },
        ]}
      />

      <section className="terms container">
        <h1>Terms and Conditions</h1>
        <div className="term">
          <h3>1. Description of Service</h3>
          <p>
            Making a decision to do something – this is the first step. We all
            know that nothing moves until someone makes a decision. The first
            action is always in making the decision to proceed.
          </p>
        </div>
        <div className="term">
          <h3>2. Your Registration Obligations</h3>
          <p>
            Focus is having the unwavering attention to complete what you set
            out to do. There are a million distractions in every facet of our
            lives. Telephones and e-mail, clients and managers, spouses and
            kids, TV, newspapers and radio – the distractions are everywhere and
            endless. Everyone wants a piece of us and the result can be totally
            overwhelming.
          </p>
        </div>
        <div className="term">
          <h3>3. User Account, Password, and Security</h3>
          <p>
            So, how can we stay on course with all the distractions in our
            lives? Willpower is a good start, but it’s very difficult to stay on
            track simply through willpower.
          </p>
        </div>
        <div className="term">
          <h3>4. User Conduct</h3>
          <p>
            We also know those epic stories, those modern-day legends
            surrounding the early failures of such supremely successful folks as
            Michael Jordan and Bill Gates. We can look a bit further back in
            time to Albert Einstein or even further back to Abraham Lincoln.
            What made each of these people so successful? Motivation.
          </p>
          <ul>
            <li>If success is a process with a number of defined steps,</li>
            <li>Commit your decision to paper, just to bring it into focus.</li>
            <li>
              Without clarity, you send a very garbled message out to the
              Universe.
            </li>
            <li>You will run aground and become hopelessly stuck in the mud</li>
            <li>Simply by asking ourselves lots of questions</li>
          </ul>
        </div>
        <div className="term">
          <h3>5. International Use</h3>
          <p>
            We also know those epic stories, those modern-day legends
            surrounding the early failures of such supremely successful folks as
            Michael Jordan and Bill Gates. We can look a bit further back in
            time to Albert Einstein or even further back to Abraham Lincoln.
            What made each of these people so successful? Motivation.
          </p>
        </div>
      </section>
    </>
  );
};

export default Terms;
