import React from 'react';

// components
import Breadcrumb from '@components/UI/breadcrumb';
import ContactCards from './ContactCards';
import ContactInputs from './ContactInputs';

// styles
import './Contact.scss';

const Contact = (): JSX.Element => {
  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/contact', text: 'Contact' },
        ]}
      />
      <div className="container">
        <section className="contact">
          <ContactCards />
          <h1>Let’s Get In Touch!</h1>
          <p>
            We have completed over a 1000+ projects for five hundred clients.
            Give us your next project.
          </p>
          <ContactInputs />
        </section>
      </div>
    </>
  );
};

export default Contact;
