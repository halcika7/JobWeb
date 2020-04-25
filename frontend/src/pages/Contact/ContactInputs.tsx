// import Input from 'components/UI/input/Input';
import React from 'react';

// components
import TextArea from '@components/UI/input/TextArea';

const ContactInputs = (): JSX.Element => (
  <section className="contact-inputs card">
    <div className="row">
      {/* <Input
        classNames="form-group col-12 col-md-6"
        name="name"
        type="text"
        required
        label="Name"
      />
      <Input
        classNames="form-group col-12 col-md-6"
        name="subject"
        type="text"
        required
        label="Subject"
      />
      <Input
        classNames="form-group col-12 col-md-6"
        name="email"
        type="text"
        required
        label="Email"
      />
      <Input
        classNames="form-group col-12 col-md-6"
        name="phone"
        type="tel"
        required={false}
        label="Phone"
      /> */}
      <TextArea
        classNames="form-group col-12"
        name="message"
        required
        label="Message"
      />
    </div>
    <button type="button">Send</button>
  </section>
);

export default ContactInputs;
