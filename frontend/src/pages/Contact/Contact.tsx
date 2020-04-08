import Breadcrumb from 'components/UI/breadcrumb/breadcrumb';
import React from 'react';
import './Contact.scss';
import ContactCards from './ContactCards';
import ContactInputs from './ContactInputs';

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
