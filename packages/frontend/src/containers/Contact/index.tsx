import React, { FC, useEffect } from 'react';

import { Actions, useSelector, useThunkDispatch, AppState } from '@job/redux';

import Breadcrumb from '@components/UI/breadcrumb';
import ContactCards from './ContactCards';
import ContactFormik from './ContactFormik';
import SweetAlert from '@components/UI/sweetAlert';

import { HTTPCodes } from '@job/common';

import { Container } from '@styled/div';
import { ContactSection, Heading, ContactParagraph } from './styled';

const Contact: FC<{}> = (): JSX.Element => {
  const State = useSelector((state: AppState) => ({
    errors: state.contact.errors,
    values: state.contact.values,
    touched: state.contact.touched,
    message: state.contact.message,
    status: state.contact.status,
  }));
  const dispatch = useThunkDispatch();

  useEffect(() => {
    return () => {
      dispatch(Actions.authReset());
    };
  }, [dispatch]);

  return (
    <>
      <Breadcrumb
        breadcrumbs={[
          { href: '/', text: 'Home' },
          { href: '/contact', text: 'Contact' },
        ]}
      />
      {State.status && State.message && (
        <SweetAlert
          message={State.message}
          type={State.status === HTTPCodes.Created ? 'success' : 'error'}
          successButton="OK"
          failedButton="Close"
          callBack={() => dispatch(Actions.resetMessages())}
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
            status={State.status}
            disabled={!!State.status && !!State.message}
            errors={State.errors}
            postNewMessage={Actions.postNewMessage}
            touched={State.touched}
            values={State.values}
          />
        </ContactSection>
      </Container>
    </>
  );
};

export default React.memo(Contact);
