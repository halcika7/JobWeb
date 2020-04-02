import aboutImg from 'assets/images/about.png';
import React from 'react';

const AboutIntro = () => (
  <section className="intro row">
    <div className="col-12 col-md-6">
      <h1>Millions of jobs, finds the one that's right for you</h1>
    </div>
    <div className="col-lg-10">
      <p>
        We also know those epic stories, those modern-day legends surrounding
        the early failures of such supremely successful folks as Michael Jordan
        and Bill Gates. We can look a bit further back in time to Albert
        Einstein or even further back to Abraham Lincoln.
      </p>
      <img src={aboutImg} alt="about" />
    </div>
  </section>
);

export default AboutIntro;
