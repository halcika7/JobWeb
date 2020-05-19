import React, { FC, useEffect } from 'react';

import Breadcrumb from '@components/UI/breadcrumb';
import ContactCards from './ContactCards';
import ContactFormik from './ContactFormik';
import SweetAlert from '@components/UI/sweetAlert';

import { mapDispatchToProps, mapStateToProps, Props } from './IContact';
import { connect } from '@hooks/connect';

import { HTTPCodes } from '@job/common';

import { Container } from '@styled/div';
import { ContactSection, Heading, ContactParagraph } from './styled';

const Contact: FC<Props> = ({
  message,
  status,
  errors,
  touched,
  values,
  resetMessage,
  postMessage,
  resetState,
}): JSX.Element => {
  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/contact', text: 'Contact' },
        ]}
      />
      {status && message && (
        <SweetAlert
          message={message}
          type={status === HTTPCodes.Created ? 'success' : 'error'}
          successButton="OK"
          failedButton="Close"
          callBack={() => resetMessage()}
          withButtons
        />
      )}
      <Container>
        <ContactSection>
          <ContactCards />
          <Heading>Let’s Get In Touch!</Heading>
          <ContactParagraph>
            We have completed over a 1000+ projects for five hundred clients.
            Give us your next project.
          </ContactParagraph>
          <ContactFormik
            status={status}
            disabled={!!status && !!message}
            errors={errors}
            postNewMessage={postMessage}
            touched={touched}
            values={values}
          />
        </ContactSection>
      </Container>
    </>
  );
};

export default React.memo(
  connect(Contact, mapStateToProps, mapDispatchToProps)
);
