import { ReactComponent as Bell } from 'assets/svgs/bell.svg';
import { ReactComponent as JobPaper } from 'assets/svgs/job-paper.svg';
import { ReactComponent as Loupe } from 'assets/svgs/loupe.svg';
import { ReactComponent as PaperLupa } from 'assets/svgs/paper-lupa.svg';
import { ReactComponent as Secure } from 'assets/svgs/secure.svg';
import { ReactComponent as StackPapers } from 'assets/svgs/stack-papers.svg';
import React from 'react';

const AboutIcons = () => (
  <section className="about-icons">
    <div className="about-grid-item card">
      <div className="icon">
        <JobPaper />
      </div>
      <h3>Advertise A Job</h3>
      <p>
        Use a past defeat as a motivator. Remind yourself you have nowhere to go
        except.
      </p>
    </div>
    <div className="about-grid-item card">
      <div className="icon">
        <StackPapers />
      </div>
      <h3>Recruiter Profiles</h3>
      <p>
        Let success motivate you. Find a picture of what epitomizes success to
        you have already.
      </p>
    </div>
    <div className="about-grid-item card">
      <div className="icon">
        <PaperLupa />
      </div>
      <h3>Find Your Dream Job</h3>
      <p>
        Make a list of your achievements toward your long-term goal and remind
        your.
      </p>
    </div>
    <div className="about-grid-item card">
      <div className="icon">
        <Loupe />
      </div>
      <h3>Search A Jobs</h3>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
    <div className="about-grid-item card">
      <div className="icon">
        <Bell />
      </div>
      <h3>Job Notifications</h3>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
    <div className="about-grid-item card">
      <div className="icon">
        <Secure />
      </div>
      <h3>Job Security</h3>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  </section>
);

export default AboutIcons;
