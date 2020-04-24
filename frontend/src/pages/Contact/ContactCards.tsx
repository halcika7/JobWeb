import React from 'react';

// svg icons
import { ReactComponent as Email } from 'assets/svgs/email.svg';
import { ReactComponent as Fax } from 'assets/svgs/fax.svg';
import { ReactComponent as MapMarker } from 'assets/svgs/map-marker.svg';
import { ReactComponent as Phone } from 'assets/svgs/phone.svg';

const ContactCards = (): JSX.Element => (
  <section className="contact-icons-grid">
    <div className="grid-item card">
      <div className="icon">
        <MapMarker />
      </div>
      <h3>Address</h3>
      <p>214 West Arnold St. New York, NY 10002</p>
    </div>
    <div className="grid-item card">
      <div className="icon">
        <Phone />
      </div>
      <h3>Phone Number</h3>
      <p>(456) 478-2589</p>
    </div>
    <div className="grid-item card">
      <div className="icon">
        <Email />
      </div>
      <h3>Email</h3>
      <p>support@email.com</p>
    </div>
    <div className="grid-item card">
      <div className="icon">
        <Fax />
      </div>
      <h3>Fax</h3>
      <p>(123) 345-6789</p>
    </div>
  </section>
);

export default ContactCards;
