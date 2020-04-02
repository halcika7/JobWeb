import { ReactComponent as Plus } from 'assets/svgs/plus.svg';
import React from 'react';

const AboutNumbers = () => (
  <section className="about-numbers grid-numbers">
    <div className="grid-number">
      <p>
        2540 <Plus />
      </p>
      <p>Jobs Available</p>
    </div>
    <div className="grid-number">
      <p>
        7325 <Plus />
      </p>
      <p>Members</p>
    </div>
    <div className="grid-number">
      <p>
        1924 <Plus />
      </p>
      <p>Resumes</p>
    </div>
    <div className="grid-number">
      <p>
        4275 <Plus />
      </p>
      <p>Companies</p>
    </div>
  </section>
);

export default AboutNumbers;
